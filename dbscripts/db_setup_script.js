db.createCollection("Position", {capped: true, size: 5242880, max: 500});
print("Position Collection Created!");
db.createCollection("Info", {capped: true, size: 5242880, max: 500});
print("Info Collection Created!");
db.createCollection("Profile", {capped: true, size: 5242880, max: 500});
print("Profile Collection Created!");
db.createCollection("UserInfo", {capped: true, size: 5242880, max: 500});
print("UserInfo Collection Created!");
db.Info.insert({
	Client: ["Select Client", "GAP", "Macys", "Other"],
	Designations: ["Select Designation", "Developer", "Quality Engineer", "System Engineer"],
	DeveloperSkills: ["Java", "Web Service", "JQuery", "Spring"],
	ExperienceRequired: ["Select Experience", "0-2", "2-4", "4-6", "6 and Above"],
	Locations: ["Select Locations", "Hyderabad", "Pune", "Bengaluru"],
	Positions: ["Select Position", "Entry Level Engineer", "Software Engineer", "Sr. Software Engineer", "Team Lead"],
	QESkills: ["Core Java", "Ruby", "Cucumber", "Selenium", "Junits"],
	Skills: ["Java", "ASP.net", "Java Script", "Web Service", "PL SQL", "JQuery", "Spring", "Struts"],
	SysESkills: ["Web Service", "PL SQL"],
	UserRoles: ["Select Role", "HR", "Manager", "Employee"],
	empPosition: ["Select Position", "Sr. Developer", "Developer", "HR", "Associate Trainee", "QA"],
	expYears: ["Select Years", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
	plocation: ["Select Location", "Hyderabad", "Pune", "Bengaluru", "Chennai"],
	qualification: ["Select Qualification", "B.E.", "B.Tech", "MBA", "MCA", "Others"],
	referredBy: ["Select Referral", "Consultancy", "Referral"],
	expMonths: ["Select Months", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
	interviewRounds: ["Technical Round I", "Technical Round II", "HR Round", "Manager Round", "Written Test", "Technical Round", "Aptitude Round"]
});
print("Data Inserted Into Info Collection!");
print("");
print("Following Collections Are In The empref db:");
db.mycollection.findOne()
db.getCollectionNames().forEach(function(collection) {
  print(collection);
});