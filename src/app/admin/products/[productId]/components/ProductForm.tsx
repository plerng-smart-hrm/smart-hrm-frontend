"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Check,
  ChevronsUpDown,
  CirclePauseIcon,
  CirclePlusIcon,
  TrashIcon,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ICategoryOption, IProduct } from "@/types/admin";
import { ProductSchema } from "@/schemas/admin/definition";
import { cn } from "@/lib/utils";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMutateProduct } from "@/stores/admin/useMutateProduct";
import { useMutateProductImage } from "@/stores/admin/useMutateProductImage";
import { IRemoveBulk } from "@/service/admin/product-image.service";

interface Props {
  categoryOptions?: ICategoryOption[];
  formRef: React.RefObject<HTMLFormElement | null>;
  setIsLoading: (loading: boolean) => void;
  initialize?: IProduct | null;
}
const ProductForm = ({
  categoryOptions,
  formRef,
  setIsLoading,
  initialize,
}: Props) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const router = useRouter();
  const [images, setImages] = useState<(File | null)[]>(Array(10).fill(null));
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [previews, setPreviews] = useState<(string | null)[]>(
    () =>
      initialize?.images?.map((item) => item.url || null) ||
      Array(10).fill(null)
  );

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialize
      ? {
          name: initialize.name || "",
          description: initialize.description || "",
          categoryId: String(initialize.categoryId || ""),
          price: Number(initialize.price) || 0,
          discountPercent: Number(initialize.discountPercent) || 0,
          quantity: Number(initialize.quantity) || 0,
          colors:
            initialize.colors?.map((color) => ({
              id: color.id,
              hexCode: color.hexCode || "#000000",
            })) || [],
        }
      : {
          name: "",
          description: "",
          categoryId: "",
          price: 0,
          discountPercent: 0,
          quantity: 0,
          colors: [],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "colors",
  });

  const { create: createProductMutate, update: updateProductMutate } =
    useMutateProduct();

  const { uploadMultiple: uploadMultipleMutate, deleteBulk: deleteBulkMutate } =
    useMutateProductImage();

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result as string;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof ProductSchema>) {
    setIsLoading(true);
    const payload = {
      name: values.name,
      description: values.description,
      categoryId: Number(values.categoryId),
      price: values.price,
      discountPercent: String(values.discountPercent),
      quantity: values.quantity,
      colors: values.colors.map((color) => {
        const colorData: { id?: number; hexCode: string } = {
          hexCode: color.hexCode,
        };
        if (color.id !== undefined) {
          colorData.id = color.id;
        }
        return colorData;
      }),
    };
    if (initialize) {
      const productId = initialize.id;
      await updateProductMutate(
        { productId, request: payload },
        {
          onSuccess: async ({ id: productId }) => {
            const hasImages = images.some((img) => img !== null);
            if (productId && hasImages) {
              await uploadImages(productId);
            }
            if (deletedImageIds.length > 0) {
              // await deleteBulkMutate({
              //   ids: deletedImageIds,
              // });
              const payload: IRemoveBulk = {
                ids: deletedImageIds,
              };

              await deleteBulkMutate({ productId, request: payload });
            }

            router.push("/admin/products");
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    } else {
      await createProductMutate(
        { request: payload },
        {
          onSuccess: async ({ id: productId }) => {
            // Upload images if any are selected
            const hasImages = images.some((img) => img !== null);
            if (productId && hasImages) {
              await uploadImages(productId);
            }
            router.push("/admin/products");
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    }
  }

  const uploadImages = async (productId: number) => {
    const formData = new FormData();
    images.forEach((image) => {
      if (image) {
        formData.append("files", image);
      }
    });

    if (formData.has("files")) {
      await uploadMultipleMutate({
        productId,
        formData,
      });
    }
  };

  const removeImage = (index: number) => {
    const previewToRemove = previews[index];

    if (initialize?.images && previewToRemove) {
      const matchedImage = initialize.images.find(
        (img) => img.url === previewToRemove
      );
      if (matchedImage && matchedImage.id !== undefined) {
        setDeletedImageIds((prev) => [...prev, matchedImage.id as number]);
      }
    }

    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews[index] = null;
    setPreviews(newPreviews);
  };

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
            {/* Product Details */}
            <Card>
              <CardHeader>Product Details</CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Product Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description{" "}
                        <span className="text-gray-500">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter quantity"
                            type="number"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price $</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter price"
                            type="number"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discountPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount %</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter discount"
                            type="number"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <FormLabel>Product Images (Max 10)</FormLabel>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square w-full overflow-hidden rounded-md border border-gray-200">
                          {previews[index] ? (
                            <Image
                              src={previews[index]! || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              layout="fill"
                              objectFit="cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-gray-100">
                              <Upload className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                          className="hidden"
                          id={`image-upload-${index}`}
                        />
                        <label
                          htmlFor={`image-upload-${index}`}
                          className="absolute inset-0 cursor-pointer"
                        />
                        {previews[index] && (
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side */}
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>Product Category</CardHeader>
              <CardContent className="space-y-8">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Category</FormLabel>

                      <Popover
                        open={isCategoryOpen}
                        onOpenChange={setIsCategoryOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              Select category
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          align="start"
                          className="p-0 w-(--radix-popover-trigger-width)"
                        >
                          <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                {categoryOptions?.map((cat) => (
                                  <CommandItem
                                    key={cat.value}
                                    value={cat.label}
                                    onSelect={() => {
                                      form.setValue(
                                        "categoryId",
                                        cat.value ?? ""
                                      );
                                      setIsCategoryOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        cat.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {cat.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <FormLabel>Colors</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ hexCode: "#000000" })}
                    >
                      <CirclePlusIcon className="h-3 w-3" /> Add Color
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-3  rounded-md mt-2"
                      >
                        <FormField
                          control={form.control}
                          name={`colors.${index}.hexCode`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    placeholder="#RRGGBB"
                                    maxLength={7}
                                    {...field}
                                  />
                                  <input
                                    type="color"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-10 h-10 rounded-md border-none cursor-pointer disabled:opacity-50"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                          className="shrink-0"
                        >
                          <TrashIcon className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
