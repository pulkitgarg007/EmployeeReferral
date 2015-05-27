conn = new Mongo("localhost:27017");
db = conn.getDB("osirpdb");
if(db.Info.count() > 0){
	db.Info.drop();
	print("Info Collection Dropped!");
}
db.createCollection("Position");
print("Position Collection Created!");
db.createCollection("Info");
print("Info Collection Created!");
db.createCollection("Profile");
print("Profile Collection Created!");
db.createCollection("UserInfo");
print("UserInfo Collection Created!");
db.createCollection("Interview");
print("Interview Collection Created!");
db.Info.insert({
	Client: ["GAP", "Macys", "Other"],
	Designations: ["Developer", "Quality Engineer", "System Engineer"],
	DeveloperSkills: ["Java", "Web Service", "JQuery", "Spring"],
	ExperienceRequired: ["0-2", "2-4", "4-6", "6 and Above"],
	Locations: ["Hyderabad", "Pune", "Bengaluru"],
	Positions: ["Entry Level Engineer", "Software Engineer", "Sr. Software Engineer", "Team Lead"],
	QESkills: ["Core Java", "Ruby", "Cucumber", "Selenium", "Junits"],
	Skills: ["Java", "ASP.net", "Java Script", "Web Service", "PL SQL", "JQuery", "Spring", "Struts"],
	SysESkills: ["Web Service", "PL SQL"],
	UserRoles: ["HR", "Manager", "Employee"],
	empPosition: ["Sr. Developer", "Developer", "HR", "Associate Trainee", "QA"],
	expYears: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
	plocation: ["Hyderabad", "Pune", "Bengaluru", "Chennai"],
	qualification: ["B.E.", "B.Tech", "MBA", "MCA", "Others"],
	referredBy: ["Consultancy", "Referral"],
	expMonths: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
	interviewRounds: ["Technical Round I", "Technical Round II", "HR Round", "Manager Round", "Written Test", "Technical Round", "Aptitude Round"],
	typeOfInterview : ["Face To Face", "Telephonic", "Skype"]
});
print("Data Inserted Into Info Collection!");
print("");
print("Following Collections Are In The empref db:");
db.mycollection.findOne()
db.getCollectionNames().forEach(function(collection) {
  print(collection);
});