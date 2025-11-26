"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Stethoscope, Syringe, Baby } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import HealthCheckForm from "./forms/HealthCheckForm";
import VaccineForm from "./forms/VaccineForm";
import MaternityForm from "./forms/MaternityForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IHealthCheck, IMaternity, IVaccine, IWarning } from "@/types/admin";
import { formatDate } from "@/utils/format";
import HealthCheckDialog from "./dialogs/HealthCheckDialog";

interface Props {
  employeeId?: number;
  healthChecks?: IHealthCheck[];
  vaccines?: IVaccine[];
  maternities?: IMaternity[];
  warnings?: IWarning[];
}

const HealthMedicalSection = ({
  employeeId,
  healthChecks = [],
  vaccines = [],
  maternities = [],
  warnings = [],
}: Props) => {
  const [openDialog, setOpenDialog] = useState<
    "health" | "vaccine" | "maternity" | null
  >(null);

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* -------------------------------- HEALTH CHECKS -------------------------------- */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Health Checks
              </CardTitle>

              <Button size="sm" onClick={() => setOpenDialog("health")}>
                <Plus className="w-4 h-4" />
                Add More
              </Button>
            </CardHeader>

            <CardContent>
              {healthChecks.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No health checks recorded yet.
                </p>
              ) : (
                <div className="max-h-48 overflow-y-auto rounded-md border relative">
                  <Table className="w-full">
                    <TableHeader className="sticky top-0 bg-gray-100 z-20">
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Check Date</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {healthChecks.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{formatDate(item.checkDate)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* -------------------------------- VACCINES -------------------------------- */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Syringe className="w-5 h-5" />
                Vaccines
              </CardTitle>

              <Button size="sm" onClick={() => setOpenDialog("vaccine")}>
                <Plus className="w-4 h-4" />
                Add More
              </Button>
            </CardHeader>

            <CardContent>
              {vaccines.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No vaccines recorded yet.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead>Name</TableHead>
                      <TableHead>Vaccine No</TableHead>
                      <TableHead>Vaccine Date</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {vaccines.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.vaccineNo}</TableCell>
                        <TableCell>{formatDate(item.vaccineDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* -------------------------------- MATERNITY RECORDS -------------------------------- */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Baby className="w-5 h-5" />
                Maternity Records
              </CardTitle>

              <Button size="sm" onClick={() => setOpenDialog("maternity")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Maternity
              </Button>
            </CardHeader>

            <CardContent>
              {maternities.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No health checks recorded yet.
                </p>
              ) : (
                <div className="max-h-48 overflow-y-auto">
                  <Table className="relative">
                    <TableHeader className="sticky top-0 bg-gray-100 z-10">
                      <TableRow className="bg-gray-100">
                        <TableHead>Pregnancy</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Delivery Baby Date</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {maternities.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.pregnancyStatus}</TableCell>
                          <TableCell>{formatDate(item.startDate)}</TableCell>
                          <TableCell>
                            {formatDate(item.deliveryBabyDate)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Baby className="w-5 h-5" />
                Warning Records
              </CardTitle>

              <Button size="sm" onClick={() => setOpenDialog("maternity")}>
                <Plus className="w-4 h-4" />
                Add More
              </Button>
            </CardHeader>

            <CardContent>
              {warnings.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No health checks recorded yet.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead>Date</TableHead>
                      <TableHead>Result</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {warnings.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.remark}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* -------------------------------- MODALS -------------------------------- */}

        <Dialog
          open={openDialog === "vaccine"}
          onOpenChange={(open) => !open && setOpenDialog(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Vaccine</DialogTitle>
            </DialogHeader>
            <VaccineForm
              onClose={() => setOpenDialog(null)}
              employeeId={employeeId}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={openDialog === "maternity"}
          onOpenChange={(open) => !open && setOpenDialog(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Maternity Record</DialogTitle>
            </DialogHeader>
            <MaternityForm
              onClose={() => setOpenDialog(null)}
              employeeId={employeeId}
            />
          </DialogContent>
        </Dialog>
      </div>

      <HealthCheckDialog
        open={openDialog === "health"}
        onClose={() => setOpenDialog(null)}
        employeeId={employeeId}
        initialData={null}
      />
    </>
  );
};

export default HealthMedicalSection;
