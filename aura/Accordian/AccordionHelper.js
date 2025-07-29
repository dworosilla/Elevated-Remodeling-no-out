({
  // Shows an element
  slideDown: function(component, event, helper) {
    var accordionElement = component.find("accordionContent").getElement();
    var isOpenState = component.get("v.isOpenState");

    if (accordionElement && isOpenState === 'closed') {
      var height = helper.getHeight(accordionElement); // Get the natural height
      accordionElement.style.height = height; // Update the height
      component.set("v.isOpenState", 'opening');

      // Once the transition is complete, remove the inline height so the content can scale responsively
      setTimeout($A.getCallback(function () {
        accordionElement.style.height = '';
        component.set("v.isOpenState", 'open');
      }), 500);
    }
  },

  // Hide an element
  slideUp: function(component, event, helper) {
    var accordionElement = component.find("accordionContent").getElement();
    var isOpenState = component.get("v.isOpenState");

    if (accordionElement && isOpenState === 'open') {
      // Give the element a height to change from (we could also use getHeight() here)
      accordionElement.style.height = accordionElement.scrollHeight + 'px';

      // Set the height back to 0
      setTimeout($A.getCallback(function () {
        component.set("v.isOpenState", 'closing');
        accordionElement.style.height = '0';
      }), 10);

      // When the transition is complete, hide it
      setTimeout($A.getCallback(function () {
        component.set("v.isOpenState", 'closed');
        accordionElement.style.height = '';
      }), 500);
    }
  },

  // Helper function to get the natural height of an element
  getHeight: function(element) {
    var clone = element.cloneNode(true);
    clone.style.visibility = 'hidden';
    clone.style.height = 'auto';
    document.body.appendChild(clone);
    var height = clone.offsetHeight + 'px';
    document.body.removeChild(clone);
    return height;
  }
})