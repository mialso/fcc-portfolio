window.onbeforeunload = function() {
  window.scrollTo(0,0);
}
$(document).ready(function() {
  $(".item").css("height", $(window).height() - 100);
  $(".descCont").css("max-height", $(window).height() - 120);
  $(".lastItem").css("height", $(window).height() - 25);
  var footWatcher = initFootr();
  for (var i = 1; i < 6; i++) {
    initLogoHover(i);
    initWatcher(i, footWatcher);
  }
  //scrollMonitor.update();
  //scrollMonitor.recalculateLocations();
});
function initLogoHover(i) {
  var thmb = $("#thmbCont".concat(i)).find(".thmb");
  var link = thmb.find(".links");
  var logo = thmb.find(".logo");
  thmb.hover(
    function() {link.css("visibility", "visible"); logo.css("border-color", "red");},
    function() {link.css("visibility", "hidden"); logo.css("border-color", "blue");});
};
function initWatcher(i, footWatcher) {
  var topM = $("#m".concat(i).concat(' .topM'));
  var centM = $("#m".concat(i).concat(' .centM'));
  var thmbCont = $("#thmbCont".concat(i));
  var thmb = $("#thmbCont".concat(i).concat(" .thmb"));
  var descCont = $("#descCont".concat(i));
  var desc = $("#desc".concat(i));
  var thmbWatcher = scrollMonitor.create(thmbCont, {top: 20});
  var descWatcher = scrollMonitor.create(descCont, {bottom: 0});
  if(descWatcher.isBelowViewport && !descWatcher.isInViewport) {
    centM.append(thmb);
  } 
  descWatcher.stateChange(
    function() {
      if(descWatcher.isInViewport) {
        if(descWatcher.isBelowViewport) {
          descCont.append(desc);
          if(thmbWatcher.isInViewport) {
            thmbCont.append(thmb);
            thmbWatcher.recalculateLocation();
          }
        }
        if(descWatcher.isFullyInViewport || descWatcher.isAboveViewport) {
          if(footWatcher.isInViewport) return;
          if(i!=5) centM.append(desc);  // here is a bug with 4th column
        }
      } else {
        if(descWatcher.isBelowViewport) {
          descCont.append(desc);
          centM.append(thmb);
        } else {
          if(footWatcher.isInViewport) return;
          centM.append(desc);
        }
      }
    });
  thmbWatcher.stateChange(
    function() {
      if(thmbWatcher.isAboveViewport) {
        topM.append(thmb);
      } else {
        if(descWatcher.isInViewport) {
          thmbCont.append(thmb);
          thmbWatcher.recalculateLocation();
        } else {
          centM.append(thmb);
        }
      }
    });
};
function initFootr() {
  var topM = $(".mask .topM");
  var thmbs = [];
  for (var i = 1; i < 6; i++) {
    thmbs.push($("#thmbCont".concat(i).concat(" .thmb")));
  }
  var descs = [];
  for (var i = 1; i < 6; i++) {
    descs.push($("#desc".concat(i)));
  }
  var items = [];
  for (var i = 1; i < 6; i++) {
    items.push($(".itemContainer:nth-child(".concat(i).concat(") .lastItem")));
  }
  var tops = [];
  for (var i = 1; i < 6; i++) {
    tops.push($("#m".concat(i).concat(" .topM")));
  }
  var cents = [];
  for (var i = 1; i < 6; i++) {
    cents.push($("#m".concat(i).concat(" .centM")));
  }
  var contWatcher = scrollMonitor.create($(".footer"), {top:-25});
  contWatcher.visibilityChange(function() {
    if(contWatcher.isInViewport) {
      for (var i=0; i<5; i++) {
        if(i==4) {
          items[i].prepend(thmbs[i]);
        } else {
          items[i].append(thmbs[i]);
          items[i].append(descs[i]);
        }
      }
    }
    if(!contWatcher.isInViewport) {
      for (var i=0; i<5; i++) {
        //if(cents[i].children().length === 0) {
          if(i==4) {
            tops[i].append(thmbs[i]);
          } else {
            tops[i].append(thmbs[i]);
            cents[i].append(descs[i]);
          }
        //}
      }
    }
  });
  return contWatcher;
};
