import Vue from "vue";
import { Button } from "element-ui";  // 导入element-ui中的Button组件，这是使用element-ui的第一步
import { Form,FormItem } from "element-ui";
import { Input } from "element-ui";

Vue.use(Button)   // 把导入的Button组件注册为全局可用的组件，这是使用element-ui的第二步
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
