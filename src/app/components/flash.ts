$.fn.flash = function (name, keepClass) {
  var effect = name + ' animated';

  this.addClass(effect);

  if (!keepClass) {
    this.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass(effect);
    });
  }

};
