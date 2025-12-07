"use client";
import { ScrollArea } from "@/components/ui/scroll-area";

// Employee profile data
interface EmployeeProfile {
  id: string;
  nameEnglish: string;
  nameKhmer: string;
  gender: "Male" | "Female";
  joinedDate: string;
  official: "Normal" | "Special";
}

const EMPLOYEE_PROFILES: Record<string, EmployeeProfile> = {
  // A1 employees
  "A1.0001": {
    id: "A1.0001",
    nameEnglish: "Sokha Chan",
    nameKhmer: "ចាន់ សុខា",
    gender: "Male",
    joinedDate: "15/03/2024",
    official: "Normal",
  },
  "A1.0069": {
    id: "A1.0069",
    nameEnglish: "Dara Pheap",
    nameKhmer: "ភាព ដារ៉ា",
    gender: "Female",
    joinedDate: "20/05/2024",
    official: "Normal",
  },
  "A1.0070": {
    id: "A1.0070",
    nameEnglish: "Srey Leak",
    nameKhmer: "ស្រីលាក់",
    gender: "Female",
    joinedDate: "12/06/2024",
    official: "Normal",
  },
  "A1.0071": {
    id: "A1.0071",
    nameEnglish: "Vanna Kim",
    nameKhmer: "គឹម វណ្ណា",
    gender: "Male",
    joinedDate: "08/04/2024",
    official: "Special",
  },
  "A1.0073": {
    id: "A1.0073",
    nameEnglish: "Sophea Ly",
    nameKhmer: "លី សុភា",
    gender: "Female",
    joinedDate: "25/07/2024",
    official: "Normal",
  },
  "A1.0074": {
    id: "A1.0074",
    nameEnglish: "Raksa Meng",
    nameKhmer: "ម៉េង រក្សា",
    gender: "Male",
    joinedDate: "30/08/2024",
    official: "Normal",
  },
  "A1.0075": {
    id: "A1.0075",
    nameEnglish: "Chantha Ouk",
    nameKhmer: "អ៊ុក ចន្ថា",
    gender: "Female",
    joinedDate: "10/09/2024",
    official: "Normal",
  },

  // A2 employees
  "A2.0001": {
    id: "A2.0001",
    nameEnglish: "Pisey Sam",
    nameKhmer: "សំ ពិសី",
    gender: "Female",
    joinedDate: "05/02/2024",
    official: "Normal",
  },
  "A2.0002": {
    id: "A2.0002",
    nameEnglish: "Kosal Tan",
    nameKhmer: "តាន់ កុសល",
    gender: "Male",
    joinedDate: "18/03/2024",
    official: "Normal",
  },
  "A2.0003": {
    id: "A2.0003",
    nameEnglish: "Sreymom Chea",
    nameKhmer: "ជា ស្រីមម",
    gender: "Female",
    joinedDate: "22/04/2024",
    official: "Special",
  },

  // A3 employees
  "A3.0001": {
    id: "A3.0001",
    nameEnglish: "Virak Hun",
    nameKhmer: "ហ៊ុន វីរៈ",
    gender: "Male",
    joinedDate: "01/01/2024",
    official: "Normal",
  },
  "A3.0002": {
    id: "A3.0002",
    nameEnglish: "Bopha Keo",
    nameKhmer: "កែវ បុប្ផា",
    gender: "Female",
    joinedDate: "14/02/2024",
    official: "Normal",
  },

  // A4 employees
  "A4.0001": {
    id: "A4.0001",
    nameEnglish: "Davith Nhem",
    nameKhmer: "ញឹម ដាវីត",
    gender: "Male",
    joinedDate: "10/01/2024",
    official: "Normal",
  },
  "A4.0002": {
    id: "A4.0002",
    nameEnglish: "Chanthy Sok",
    nameKhmer: "សុខ ចន្ធី",
    gender: "Female",
    joinedDate: "20/02/2024",
    official: "Normal",
  },
  "A4.0003": {
    id: "A4.0003",
    nameEnglish: "Ponleak Heng",
    nameKhmer: "ហេង ពន្លឺ",
    gender: "Male",
    joinedDate: "15/03/2024",
    official: "Special",
  },
  "A4.0004": {
    id: "A4.0004",
    nameEnglish: "Ratana Chim",
    nameKhmer: "ឈឹម រតនា",
    gender: "Female",
    joinedDate: "05/04/2024",
    official: "Normal",
  },

  // A5 employees
  "A5.0001": {
    id: "A5.0001",
    nameEnglish: "Setha Prak",
    nameKhmer: "ប្រាក់ សេដ្ឋា",
    gender: "Male",
    joinedDate: "12/05/2024",
    official: "Normal",
  },
  "A5.0002": {
    id: "A5.0002",
    nameEnglish: "Sreypov Ung",
    nameKhmer: "អ៊ុង ស្រីពៅ",
    gender: "Female",
    joinedDate: "18/06/2024",
    official: "Normal",
  },

  // Button employees
  "Button.0001": {
    id: "Button.0001",
    nameEnglish: "Makara Ros",
    nameKhmer: "រស់ មករា",
    gender: "Male",
    joinedDate: "01/03/2024",
    official: "Normal",
  },
  "Button.0002": {
    id: "Button.0002",
    nameEnglish: "Sothea Van",
    nameKhmer: "វ៉ាន់ សុធា",
    gender: "Female",
    joinedDate: "15/04/2024",
    official: "Normal",
  },

  // CL employee
  "CL.0001": {
    id: "CL.0001",
    nameEnglish: "Bunthoeun Chey",
    nameKhmer: "ជ័យ ប៊ុនធឿន",
    gender: "Male",
    joinedDate: "10/02/2024",
    official: "Special",
  },

  // CUT employees
  "CUT.0001": {
    id: "CUT.0001",
    nameEnglish: "Rithy Long",
    nameKhmer: "ឡុង រិទ្ធី",
    gender: "Male",
    joinedDate: "05/01/2024",
    official: "Normal",
  },
  "CUT.0002": {
    id: "CUT.0002",
    nameEnglish: "Sophal Mao",
    nameKhmer: "ម៉ៅ សុផល",
    gender: "Male",
    joinedDate: "20/02/2024",
    official: "Normal",
  },
  "CUT.0003": {
    id: "CUT.0003",
    nameEnglish: "Chanlina Nou",
    nameKhmer: "នូ ចន្ទលីណា",
    gender: "Female",
    joinedDate: "10/03/2024",
    official: "Normal",
  },

  // EMB employees
  "EMB.0001": {
    id: "EMB.0001",
    nameEnglish: "Kunthea Phan",
    nameKhmer: "ផាន គន្ធា",
    gender: "Female",
    joinedDate: "15/02/2024",
    official: "Normal",
  },
  "EMB.0002": {
    id: "EMB.0002",
    nameEnglish: "Samnang Rath",
    nameKhmer: "រ៉ាត់ សំណាង",
    gender: "Male",
    joinedDate: "25/03/2024",
    official: "Normal",
  },

  // Ironing employees
  "IR.0005": {
    id: "IR.0005",
    nameEnglish: "Pheakdey San",
    nameKhmer: "សាន ភាគដី",
    gender: "Male",
    joinedDate: "01/01/2024",
    official: "Normal",
  },
  "IR.0004": {
    id: "IR.0004",
    nameEnglish: "Sreynich Duong",
    nameKhmer: "ឌួង ស្រីនិច",
    gender: "Female",
    joinedDate: "05/01/2024",
    official: "Normal",
  },
  "IR.0006": {
    id: "IR.0006",
    nameEnglish: "Vuthy Em",
    nameKhmer: "អឹម វុទ្ធី",
    gender: "Male",
    joinedDate: "10/01/2024",
    official: "Normal",
  },
  "IR.0008": {
    id: "IR.0008",
    nameEnglish: "Borey Touch",
    nameKhmer: "ទូច បូរី",
    gender: "Male",
    joinedDate: "15/01/2024",
    official: "Normal",
  },
  "IR.0002": {
    id: "IR.0002",
    nameEnglish: "Dalis Phon",
    nameKhmer: "ផន ដាលីស",
    gender: "Female",
    joinedDate: "20/01/2024",
    official: "Special",
  },
  "IR.0011": {
    id: "IR.0011",
    nameEnglish: "Rathana Suon",
    nameKhmer: "ស៊ន រតនា",
    gender: "Male",
    joinedDate: "25/01/2024",
    official: "Normal",
  },
  "IR.0010": {
    id: "IR.0010",
    nameEnglish: "Sreypeou Khem",
    nameKhmer: "ខឹម ស្រីពៅ",
    gender: "Female",
    joinedDate: "30/01/2024",
    official: "Normal",
  },
  "IR.0009": {
    id: "IR.0009",
    nameEnglish: "Vannak Ouch",
    nameKhmer: "អ៊ូច វណ្ណៈ",
    gender: "Male",
    joinedDate: "05/02/2024",
    official: "Normal",
  },
  "IR.0017": {
    id: "IR.0017",
    nameEnglish: "Chanthou Sar",
    nameKhmer: "សារ ចន្ទូ",
    gender: "Female",
    joinedDate: "10/02/2024",
    official: "Normal",
  },
  "IR.0022": {
    id: "IR.0022",
    nameEnglish: "Thida Nget",
    nameKhmer: "ង៉េត ធីដា",
    gender: "Female",
    joinedDate: "15/02/2024",
    official: "Normal",
  },
  "IR.0021": {
    id: "IR.0021",
    nameEnglish: "Narith Nhean",
    nameKhmer: "ញាន់ ណារិទ្ធ",
    gender: "Male",
    joinedDate: "20/02/2024",
    official: "Normal",
  },
  "IR.0025": {
    id: "IR.0025",
    nameEnglish: "Sreyleak Chay",
    nameKhmer: "ចាយ ស្រីលាក",
    gender: "Female",
    joinedDate: "25/02/2024",
    official: "Normal",
  },
  "IR.0027": {
    id: "IR.0027",
    nameEnglish: "Sokhom Khun",
    nameKhmer: "ខុន សុខុម",
    gender: "Male",
    joinedDate: "01/03/2024",
    official: "Normal",
  },
  "IR.0030": {
    id: "IR.0030",
    nameEnglish: "Leakhena Kong",
    nameKhmer: "គង់ លាខេណា",
    gender: "Female",
    joinedDate: "05/03/2024",
    official: "Normal",
  },
  "IR.0031": {
    id: "IR.0031",
    nameEnglish: "Vong Borey",
    nameKhmer: "វង់ បូរី",
    gender: "Male",
    joinedDate: "11/11/2025",
    official: "Normal",
  },
  "IR.0032": {
    id: "IR.0032",
    nameEnglish: "Ponleu Chak",
    nameKhmer: "ចាក់ ពន្លឺ",
    gender: "Male",
    joinedDate: "10/03/2024",
    official: "Special",
  },

  // Packing employees
  "Packing.0001": {
    id: "Packing.0001",
    nameEnglish: "Kimheng Sok",
    nameKhmer: "សុខ គឹមហេង",
    gender: "Male",
    joinedDate: "01/02/2024",
    official: "Normal",
  },
  "Packing.0002": {
    id: "Packing.0002",
    nameEnglish: "Srey Mom",
    nameKhmer: "ម៉ម ស្រី",
    gender: "Female",
    joinedDate: "15/02/2024",
    official: "Normal",
  },
  "Packing.0003": {
    id: "Packing.0003",
    nameEnglish: "Chandara Yen",
    nameKhmer: "យ៉ែន ចន្ដារា",
    gender: "Female",
    joinedDate: "01/03/2024",
    official: "Normal",
  },

  // SR employees
  "SR.0001": {
    id: "SR.0001",
    nameEnglish: "Piseth Leng",
    nameKhmer: "លេង ពិសិដ្ឋ",
    gender: "Male",
    joinedDate: "10/01/2024",
    official: "Normal",
  },
  "SR.0002": {
    id: "SR.0002",
    nameEnglish: "Sreyton Vorn",
    nameKhmer: "វ៉ន ស្រីទន",
    gender: "Female",
    joinedDate: "20/02/2024",
    official: "Special",
  },
};

// Helper function to generate random time
const randomTime = (
  hour: number,
  minMinute: number = 0,
  maxMinute: number = 59
) => {
  const minute =
    Math.floor(Math.random() * (maxMinute - minMinute + 1)) + minMinute;
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};

// Helper function to generate attendance data
const generateAttendanceData = (employeeId: string) => {
  const data = [];
  const startDate = new Date("2025-11-11");

  for (let i = 0; i < 20; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const day = currentDate.toLocaleDateString("en-US", { weekday: "short" });
    const dateStr = currentDate.toLocaleDateString("en-GB");
    const isSunday = day === "Sun";
    const isSaturday = day === "Sat";
    const randomAbsent = Math.random() > 0.9; // 10% chance of absence

    const record: any = {
      date: dateStr,
      dateWork: dateStr,
      day: day,
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 0,
      x20: 0,
      adjust: "",
    };

    if (isSunday) {
      // Sunday - no work
      record.t1 = "";
      record.t2 = "";
      record.t3 = "";
      record.t4 = "";
    } else if (randomAbsent && !isSaturday) {
      // Random absence (not on Saturday)
      record.t1 = "";
      record.t2 = "";
      record.t3 = randomTime(12, 0, 10);
      record.t4 = randomTime(20, 0, 10);
      record.absent = 4.0;
      record.x15 = isSaturday ? 0 : 4;
      record.adjust = "Touch";
    } else if (isSaturday) {
      // Saturday - shorter hours
      const hasWork = Math.random() > 0.3; // 70% work on Saturday
      if (hasWork) {
        record.t1 = randomTime(7, 0, 10);
        record.t2 = randomTime(11, 0, 10);
        record.t3 = randomTime(12, 0, 10);
        record.t4 = randomTime(16, 0, 10);
        record.x15 = 0;
      } else {
        record.t1 = "";
        record.t2 = "";
        record.t3 = "";
        record.t4 = "";
      }
    } else {
      // Regular work day
      const leavesEarly = Math.random() > 0.85; // 15% chance to leave early
      record.t1 = randomTime(7, 0, 10);
      record.t2 = randomTime(11, 0, 10);
      record.t3 = randomTime(12, 0, 10);
      record.t4 = leavesEarly ? randomTime(18, 0, 10) : randomTime(20, 0, 10);
      record.x15 = leavesEarly ? 2 : 4;

      if (Math.random() > 0.95) {
        record.reason = "Touch";
      }
    }

    data.push(record);
  }

  return data;
};

// Generate fake attendance data for all employees
const ATTENDANCE_DATA: Record<string, any[]> = {
  // A1 employees
  "A1.0001": generateAttendanceData("A1.0001"),
  "A1.0069": generateAttendanceData("A1.0069"),
  "A1.0070": generateAttendanceData("A1.0070"),
  "A1.0071": generateAttendanceData("A1.0071"),
  "A1.0073": generateAttendanceData("A1.0073"),
  "A1.0074": generateAttendanceData("A1.0074"),
  "A1.0075": generateAttendanceData("A1.0075"),

  // A2 employees
  "A2.0001": generateAttendanceData("A2.0001"),
  "A2.0002": generateAttendanceData("A2.0002"),
  "A2.0003": generateAttendanceData("A2.0003"),

  // A3 employees
  "A3.0001": generateAttendanceData("A3.0001"),
  "A3.0002": generateAttendanceData("A3.0002"),

  // A4 employees
  "A4.0001": generateAttendanceData("A4.0001"),
  "A4.0002": generateAttendanceData("A4.0002"),
  "A4.0003": generateAttendanceData("A4.0003"),
  "A4.0004": generateAttendanceData("A4.0004"),

  // A5 employees
  "A5.0001": generateAttendanceData("A5.0001"),
  "A5.0002": generateAttendanceData("A5.0002"),

  // Button employees
  "Button.0001": generateAttendanceData("Button.0001"),
  "Button.0002": generateAttendanceData("Button.0002"),

  // CL employee
  "CL.0001": generateAttendanceData("CL.0001"),

  // CUT employees
  "CUT.0001": generateAttendanceData("CUT.0001"),
  "CUT.0002": generateAttendanceData("CUT.0002"),
  "CUT.0003": generateAttendanceData("CUT.0003"),

  // EMB employees
  "EMB.0001": generateAttendanceData("EMB.0001"),
  "EMB.0002": generateAttendanceData("EMB.0002"),

  // Ironing employees
  "IR.0005": generateAttendanceData("IR.0005"),
  "IR.0004": generateAttendanceData("IR.0004"),
  "IR.0006": generateAttendanceData("IR.0006"),
  "IR.0008": generateAttendanceData("IR.0008"),
  "IR.0002": generateAttendanceData("IR.0002"),
  "IR.0011": generateAttendanceData("IR.0011"),
  "IR.0010": generateAttendanceData("IR.0010"),
  "IR.0009": generateAttendanceData("IR.0009"),
  "IR.0017": generateAttendanceData("IR.0017"),
  "IR.0022": generateAttendanceData("IR.0022"),
  "IR.0021": generateAttendanceData("IR.0021"),
  "IR.0025": generateAttendanceData("IR.0025"),
  "IR.0027": generateAttendanceData("IR.0027"),
  "IR.0030": generateAttendanceData("IR.0030"),
  "IR.0031": [
    {
      date: "11/11/2025",
      dateWork: "11/11/2025",
      day: "Tue",
      t1: "07:00",
      t2: "11:05",
      t3: "12:01",
      t4: "20:03",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "Touch",
      x15: 4,
      x20: 0,
      adjust: "",
    },
    {
      date: "12/11/2025",
      dateWork: "12/11/2025",
      day: "Wed",
      t1: "07:04",
      t2: "11:03",
      t3: "12:01",
      t4: "20:03",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 4,
      x20: 0,
      adjust: "",
    },
    {
      date: "13/11/2025",
      dateWork: "13/11/2025",
      day: "Thu",
      t1: "07:04",
      t2: "11:03",
      t3: "12:03",
      t4: "20:02",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 4,
      x20: 0,
      adjust: "",
    },
    {
      date: "14/11/2025",
      dateWork: "14/11/2025",
      day: "Fri",
      t1: "07:03",
      t2: "11:03",
      t3: "12:03",
      t4: "20:03",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 4,
      x20: 0,
      adjust: "",
    },
    {
      date: "15/11/2025",
      dateWork: "15/11/2025",
      day: "Sat",
      t1: "",
      t2: "",
      t3: "12:04",
      t4: "16:03",
      late: 0,
      early: 0,
      absent: 4.0,
      leave: "A",
      leaveHr: 0.0,
      reason: "A",
      x15: 5,
      x20: 0,
      adjust: "Touch",
    },
    {
      date: "16/11/2025",
      dateWork: "16/11/2025",
      day: "Sun",
      t1: "",
      t2: "",
      t3: "",
      t4: "",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 0,
      x20: 0,
      adjust: "",
    },
    {
      date: "17/11/2025",
      dateWork: "17/11/2025",
      day: "Mon",
      t1: "07:03",
      t2: "11:03",
      t3: "12:02",
      t4: "20:03",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 4,
      x20: 0,
      adjust: "",
    },
    {
      date: "18/11/2025",
      dateWork: "18/11/2025",
      day: "Tue",
      t1: "07:04",
      t2: "11:04",
      t3: "12:03",
      t4: "18:03",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 2,
      x20: 0,
      adjust: "",
    },
    {
      date: "19/11/2025",
      dateWork: "19/11/2025",
      day: "Wed",
      t1: "07:06",
      t2: "",
      t3: "12:01",
      t4: "20:03",
      late: 0,
      early: 0,
      absent: 4.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 5,
      x20: 0,
      adjust: "Touch",
    },
    {
      date: "20/11/2025",
      dateWork: "20/11/2025",
      day: "Thu",
      t1: "07:05",
      t2: "11:03",
      t3: "12:02",
      t4: "20:03",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 4,
      x20: 0,
      adjust: "",
    },
    {
      date: "21/11/2025",
      dateWork: "21/11/2025",
      day: "Fri",
      t1: "07:04",
      t2: "11:03",
      t3: "12:04",
      t4: "20:03",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 4,
      x20: 0,
      adjust: "",
    },
    {
      date: "22/11/2025",
      dateWork: "22/11/2025",
      day: "Sat",
      t1: "07:04",
      t2: "11:03",
      t3: "12:01",
      t4: "18:03",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 2,
      x20: 0,
      adjust: "",
    },
    {
      date: "23/11/2025",
      dateWork: "23/11/2025",
      day: "Sun",
      t1: "",
      t2: "",
      t3: "",
      t4: "",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 0,
      x20: 0,
      adjust: "",
    },
    {
      date: "24/11/2025",
      dateWork: "24/11/2025",
      day: "Mon",
      t1: "07:02",
      t2: "11:03",
      t3: "11:57",
      t4: "20:03",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 4,
      x20: 0,
      adjust: "",
    },
    {
      date: "25/11/2025",
      dateWork: "25/11/2025",
      day: "Tue",
      t1: "06:57",
      t2: "11:03",
      t3: "11:57",
      t4: "18:04",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 2,
      x20: 0,
      adjust: "",
    },
    {
      date: "26/11/2025",
      dateWork: "26/11/2025",
      day: "Wed",
      t1: "",
      t2: "",
      t3: "11:58",
      t4: "20:03",
      late: 0,
      early: 0,
      absent: 4.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 4,
      x20: 0,
      adjust: "Touch",
    },
    {
      date: "27/11/2025",
      dateWork: "27/11/2025",
      day: "Thu",
      t1: "07:00",
      t2: "11:03",
      t3: "11:58",
      t4: "20:03",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 4,
      x20: 0,
      adjust: "",
    },
    {
      date: "28/11/2025",
      dateWork: "28/11/2025",
      day: "Fri",
      t1: "07:01",
      t2: "10:58",
      t3: "11:56",
      t4: "19:59",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 4,
      x20: 0,
      adjust: "",
    },
    {
      date: "29/11/2025",
      dateWork: "29/11/2025",
      day: "Sat",
      t1: "06:59",
      t2: "10:59",
      t3: "11:58",
      t4: "16:00",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 0,
      x20: 0,
      adjust: "",
    },
    {
      date: "30/11/2025",
      dateWork: "30/11/2025",
      day: "Sun",
      t1: "",
      t2: "",
      t3: "",
      t4: "",
      late: 0,
      early: 0,
      absent: 0.0,
      leave: 0.0,
      leaveHr: 0.0,
      reason: "",
      x15: 0,
      x20: 0,
      adjust: "",
    },
  ],
  "IR.0032": generateAttendanceData("IR.0032"),

  // Packing employees
  "Packing.0001": generateAttendanceData("Packing.0001"),
  "Packing.0002": generateAttendanceData("Packing.0002"),
  "Packing.0003": generateAttendanceData("Packing.0003"),

  // SR employees
  "SR.0001": generateAttendanceData("SR.0001"),
  "SR.0002": generateAttendanceData("SR.0002"),
};

interface AttendanceTableProps {
  selectedEmployee: string | null;
}

export default function AttendanceTable({
  selectedEmployee,
}: AttendanceTableProps) {
  const attendanceRecords = selectedEmployee
    ? ATTENDANCE_DATA[selectedEmployee] || []
    : [];
  const employeeProfile = selectedEmployee
    ? EMPLOYEE_PROFILES[selectedEmployee]
    : null;

  // Calculate summary statistics
  const calculateSummary = () => {
    if (!attendanceRecords.length) {
      return {
        total: 0,
        ph: 0,
        sunday: 0,
        present: 0,
        absent: 0,
        leave: 0,
        late: 0,
        early: 0,
        x15: 0,
        x20: 0,
      };
    }

    const total = attendanceRecords.length;
    const sunday = attendanceRecords.filter((r) => r.day === "Sun").length;
    const absent = attendanceRecords.reduce(
      (sum, r) => sum + (r.absent || 0),
      0
    );
    const leave = attendanceRecords.reduce(
      (sum, r) => sum + (r.leaveHr || 0),
      0
    );
    const late = attendanceRecords.reduce((sum, r) => sum + (r.late || 0), 0);
    const early = attendanceRecords.reduce((sum, r) => sum + (r.early || 0), 0);
    const x15 = attendanceRecords.reduce((sum, r) => sum + (r.x15 || 0), 0);
    const x20 = attendanceRecords.reduce((sum, r) => sum + (r.x20 || 0), 0);

    // Calculate present days (days with attendance minus absent days)
    const present = attendanceRecords.filter(
      (r) => (r.t1 || r.t2 || r.t3 || r.t4) && r.absent === 0
    ).length;

    return {
      total,
      ph: 0, // Public holiday - set to 0 for now
      sunday,
      present: present.toFixed(2),
      absent: absent.toFixed(2),
      leave: leave.toFixed(2),
      late,
      early,
      x15,
      x20,
    };
  };

  const summary = calculateSummary();

  return (
    <div className="flex-1 bg-white flex flex-col">
      <div className="p-3 border-b border-slate-200 bg-slate-50">
        <h2 className="font-semibold text-sm text-slate-900">
          {selectedEmployee
            ? `Attendance Records - ${selectedEmployee}`
            : "Select Employee"}
        </h2>
      </div>

      {selectedEmployee && employeeProfile ? (
        <>
          {/* Employee Profile Section */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slate-500 text-xs">ID:</span>
                <p className="font-medium text-slate-900">
                  {employeeProfile.id}
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-xs">Name (English):</span>
                <p className="font-medium text-slate-900">
                  {employeeProfile.nameEnglish}
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-xs">Name (ខ្មែរ):</span>
                <p className="font-medium text-slate-900">
                  {employeeProfile.nameKhmer}
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-xs">Gender:</span>
                <p className="font-medium text-slate-900">
                  {employeeProfile.gender}
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-xs">Joined Date:</span>
                <p className="font-medium text-slate-900">
                  {employeeProfile.joinedDate}
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-xs">Official:</span>
                <p
                  className={`font-medium inline-flex items-center px-2 py-0.5 rounded text-xs ${
                    employeeProfile.official === "Special"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {employeeProfile.official}
                </p>
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="p-1 text-left font-semibold text-slate-700 border-r border-slate-200 w-24">
                      Date Work
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-10">
                      Day
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-12">
                      T1
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-12">
                      T2
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-12">
                      T3
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-12">
                      T4
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-10">
                      Late
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-10">
                      Early
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-12">
                      Absent
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-10">
                      Leave
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-12">
                      Leave Hr
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-16">
                      Reason
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-10">
                      x1.5
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 border-r border-slate-200 w-10">
                      x2.0
                    </th>
                    <th className="p-1 text-center font-semibold text-slate-700 w-16">
                      Adjust
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-slate-100 hover:bg-slate-50 ${
                        record.absent > 0 || record.leave ? "bg-pink-50" : ""
                      }`}
                    >
                      <td className="p-1 text-slate-900 border-r border-slate-100">
                        {record.dateWork}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.day}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.t1}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.t2}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.t3}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.t4}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.late}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.early}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.absent > 0
                          ? record.absent.toFixed(2)
                          : record.absent}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.leave}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.leaveHr > 0
                          ? record.leaveHr.toFixed(2)
                          : record.leaveHr}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.reason}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.x15}
                      </td>
                      <td className="p-1 text-center text-slate-700 border-r border-slate-100">
                        {record.x20}
                      </td>
                      <td className="p-1 text-center text-slate-700">
                        {record.adjust}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>

          {/* Summary Statistics Section */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">Total:</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-semibold min-w-[60px] text-center">
                  {summary.total}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-medium">PH:</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-semibold min-w-[60px] text-center">
                  {summary.ph}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-red-600 font-medium">Sunday:</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-semibold min-w-[60px] text-center">
                  {summary.sunday}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">Present:</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-semibold min-w-[60px] text-center">
                  {summary.present}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">Absent:</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-semibold min-w-[60px] text-center">
                  {summary.absent}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">Leave:</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-semibold min-w-[60px] text-center">
                  {summary.leave}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-red-600 font-medium">Late:</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-semibold min-w-[60px] text-center">
                  {summary.late}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-red-600 font-medium">Early:</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-semibold min-w-[60px] text-center">
                  {summary.early}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">X 1.5:</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-semibold min-w-[60px] text-center">
                  {summary.x15}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">X 2.0:</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-900 font-semibold min-w-[60px] text-center">
                  {summary.x20}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
          Select an employee to view attendance records
        </div>
      )}
    </div>
  );
}
