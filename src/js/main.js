import {myButton, myDesc} from './init';

import 'jquery';
import 'bootstrap'; // importing bootstrap.js

import 'bootstrap/scss/bootstrap.scss'; // bootstrap.scss
import '../scss/_colors.scss'; // 加入潮潮的scss
import '../scss/style.scss'; // 加入潮潮的scss
import '../scss/buttons.scss'; // 加入潮潮的scss


myDesc.hide();
myButton.on('click', function(e){
    myDesc.toggle();
});
