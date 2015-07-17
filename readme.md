#A customized web template optimized for developer's happiness


This template is generated using [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular).
It is customized and some features are added. It uses AngularJs, Typescript, SASS, BootStrap, ng-yi.


## Install
```
npm install
bower install
```

Some of the original feature includes

* You don't need to change index files or master file when you add/delete/rename you typescript.
* You don't need to add type definition (*.d.ts) file manually, and you don't need to add
 reference to them in your typescript. gulp tasks take care of them.

 
 Some feature added.
 
 * Add [ng-yi](https://github.com/fredyang/ng-yi) a localization module for angularjs
 * You can write unit test case in typescript.
 * unit test will be automatically run when script files change during `gulp serve`
 
 
## To develop
```
gulp serve
```
Gulp will inject vendor script/css/scss, it also compile your typescript, sass files, and 
  and inject them into index.html
  
## To run unit test
```
gulp test
```

## To run integration test
```
gulp protractor
```

## To build
```
gulp
```

## To serve build results
```
gulp serve:dist
```

## To clean up stuff
```
gulp clean
```

For more command, please check source code in gulp folder.



 
 
