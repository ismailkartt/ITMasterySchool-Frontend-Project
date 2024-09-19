export const config = {
  project: {
    name: "IT Mastery School",
    slogan: "Empowering Minds, Unleashing Tech: Where IT Dreams Take Flight!",
    description:
      "Unlock the Future of Technology at Our IT School: Discover Cutting-Edge Courses, Hands-on Training, and More!",
    version: "1.0.0",
  },
  contact: {
    phone1: "+1 (315) 686-8284",
    phone2: "+1 (315) 686-828",
    email: "info@itmasteryschool.com",
    address: "196 Bleecker St, New York, NY 10012, USA",
    website: "https://itmasteryschool.com",
    mapURL: "https://www.google.com.tr/maps/dir/41.0215609,40.523242/196+Bleecker+St,+New+York,+NY+10012,+USA/@40.7268459,-74.0043547,14.5z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x89c2599215ce69c3:0x9bb7fd5069e89a77!2m2!1d-74.0017883!2d40.7292403?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedURL:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.7126633971547!2d-74.00397688459468!3d40.72924037933168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599215ce69c3%3A0x9bb7fd5069e89a77!2s196%20Bleecker%20St%2C%20New%20York%2C%20NY%2010012%2C%20USA!5e0!3m2!1sen!2str!4v1624291701894!5m2!1sen!2str",
    socialMedia: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com",
    },
  },
  api: {
    baseUrl: "https://mycampusmates.com/app",
  },
  pageRoles: {
    dashboard: ["ADMIN", "MANAGER", "ASISTANTMANAGER", "TEACHER", "STUDENT"],
    adminManagement: ["ADMIN"],
    managerManagement: ["ADMIN"],
    assistantManagerManagement: ["ADMIN", "MANAGER"],
    teacherManagement: ["ADMIN", "ASISTANTMANAGER"],
    lessonManagement: ["ADMIN", "ASISTANTMANAGER"],
    studentManagement: ["ADMIN", "ASISTANTMANAGER"],
    studentInfoManagement: ["TEACHER"],
  },
  educationTerms: [
    { label: "Fall", key: "FALL_SEMESTER" },
    { label: "Spring", key: "SPRİNG_SEMESTER" },
    { label: "Autumn", key: "AUTMN_SEMESTER" },
  ],
  days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
};
