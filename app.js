// When using constant you fix an object to a value, so it cannot be overwrited later on in the code. It will keep that value forever

// You can do this within funtion and it will then only work within that function and not outsite
const vizContainer = document.getElementById("vizContainer");

// This is the url for the viz. Copy from the "Share" feature
//Do not copy the link from the browser
const url =
  "https://public.tableau.com/views/ReligiousPeopleHomosexuality/ReligiousPeopleHomosexuality?:language=en-GB&:display_count=y&:origin=viz_share_link";

const options = {
  device: "desktop",
  height: 860,
  width: 1090,
};
// Constant for the button
const hideviz = document.getElementById("Hide Viz");
const showviz = document.getElementById("Show Viz");
const Central = document.getElementById("Central");
const North = document.getElementById("North");
const South = document.getElementById("South");
const Revert = document.getElementById("Revert");

// This way
let viz;

function initViz() {
  // We use console.log to display messages when "Inspecting" in the browser. If this log does not who, the bug would be before this
  console.log("The viz does trigger");
  viz = new tableau.Viz(vizContainer, url, options);
}

document.addEventListener("DOMContentLoaded", initViz);

// FUNCTIONS
// URL for Tableau JAVA API https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#vizcreateoptions_record

// Funtion that will hide the viz
function hidetableau() {
  console.log("hiding viz");
  // this funciton hide() its has been looked at the API documentation for TAbleau JAva API
  viz.hide();
}

// Funtion that will Show the viz
function Showtableau() {
  console.log("showing viz");
  // this funciton show() its has been looked at the API documentation for TAbleau JAva API
  viz.show();
}

// Function for filtering to region
function filterRegion(value) {
  const sheettofilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");
  console.log(sheettofilter);

  sheettofilter.applyFilterAsync(
    "Region",
    // the value is the sheet we are applying the value to
    value,
    tableau.FilterUpdateType.REPLACE
  );
}

// looping through filters and obtain the Value for the filterRegion Function

document.querySelectorAll(".filter").forEach((button) => {
  console.log(button);
  //   get the 'button value just saved and apply when 'clicking' to filter the sheet
  button.addEventListener("click", (e) => filterRegion(e.target.value));
});

// function to revert filter

function revertFunction() {
  console.log("Revertin");
  viz.revertAllAsync();
}

// When to execute the hide function
hideviz.addEventListener("click", hidetableau);
showviz.addEventListener("click", Showtableau);
Revert.addEventListener("click", revertFunction);
