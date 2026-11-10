export interface Agent {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  city: string;
  properties: number;
  image: string; // path inside /public
}

export const agents: Agent[] = [
  { id: 1, name: "Karen Eilla Boyette", role: "Real-Estate Agent", email: "kareneboyette@armyspy.com", phone: "+502-324-4194", city: "Manchester", properties: 15, image: "/agents/1.jpg" },
  { id: 2, name: "Walter Devid Moye", role: "Real-Estate Agent", email: "walterdevidmoye@armyspy.com", phone: "+457-324-4147", city: "Chicago, Canada", properties: 10, image: "/agents/2.jpg" },
  { id: 3, name: "David Smith Raddy", role: "Real-Estate Agent", email: "kareneboyette@armyspy.com", phone: "+584-324-7835", city: "Manchester", properties: 15, image: "/agents/3.jpg" },
  { id: 4, name: "Jhon Haron Bably", role: "Real-Estate Agent", email: "kareneboyette@armyspy.com", phone: "+502-324-4194", city: "Chicago, Canada", properties: 15, image: "/agents/4.jpg" },
];