import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date',(value,format='yyyy-MM-dd')=>{
	return dayjs(value).format(format)

})
