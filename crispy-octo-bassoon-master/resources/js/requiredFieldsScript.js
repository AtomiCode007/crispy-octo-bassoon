function validateForm() {
    var b = document.forms["parameters"]["budget"].value;
    if (b == "") {
      alert("Please choose a budget level");
      return false;
    }
    var c = document.forms["parameters"]["climate"].value;
    if (c == "") {
      alert("Please choose a climate");
      return false;
    }
    var aL = document.forms["parameters"]["activityLevel"].value;
    if (aL == "") {
      alert("Please choose an activity level");
      return false;
    }
    var r = document.forms["parameters"]["region"].value;
    if (r == "") {
      alert("Please choose a region");
      return false;
    }
  }