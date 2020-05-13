function tip_items() {
  var tip = document.getElementById("tips").value;

  if (tip) {
    var listElement = document.createElement("li");

		listElement.appendChild(document.createTextNode(tip));

		var tips_added = document.getElementById("tips_added");
		tips_added.appendChild(listElement);
  }
}
