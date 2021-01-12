const initialData = {
    teamMembers: {
      jdoe: { id: "jdoe", content: "John Doe", shift: "6am-3pm" },
      rlong: { id: "rlong", content: "Rob Long", shift: "9am-6pm" },
      thard: { id: "thard", content: "Tim Hard", shift: "9am-6pm" },
      jvice: { id: "jvice", content: "Jack Vice", shift: "6am-3pm" }
    },
    pods: {
      "pod-1": {
        id: "pod-1",
        title: "Team 1",
        teamMemberIds: ["jdoe", "rlong", "thard", "jvice"]
      },
      "pod-2": {
        id: "pod-2",
        title: "Team 2",
        teamMemberIds: []
      },
      "pod-3": {
        id: "pod-3",
        title: "Team 3",
        teamMemberIds: []
      }
    },
    podOrder: ["pod-1", "pod-2", "pod-3"]
  };
  
  export default initialData;
  