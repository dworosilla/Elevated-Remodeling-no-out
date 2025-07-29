({
  onRender: function(component, event, helper) {
    var isOpen = component.get("v.isOpen");
    if (isOpen) {
      helper.slideDown(component, event, helper);
    } else {
      helper.slideUp(component, event, helper);
    }
  }
})