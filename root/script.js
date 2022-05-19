window.onscroll = function() {
  if ((document.documentElement.scrollTop == 0)) {
    // ||(document.documentElement.scrollTop == 1596)||(document.documentElement.scrollTop == 3194)
    document.getElementById("navBar").style.backgroundColor = "rgb(33, 33, 33, 0)";
  } else {
    document.getElementById("navBar").style.backgroundColor = "rgb(33, 33, 33, 1)";
  }
}