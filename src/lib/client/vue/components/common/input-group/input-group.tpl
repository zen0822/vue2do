<div class="input-group-stage {{class}}">

	<div class="input-group-header" v-if="inputHeaderInfo">
		{{inputHeaderInfo}}
	</div>

  <ul>
    <li v-for="item in inputItems">
    	<label>
    		<em>{{item.text}}</em>

    		<input class="form-control" type="text" value="{{item.value}}" v-model="item.value" @keyup="monitorVal(item.value, $index)" maxlength={{maxlength}}>
    	</label>

    	<div class="extra-info" v-if="hasExtra">
    		<em>{{extraInfo.info1}}</em>
    		<span>{{extraInfo.info2}}</span>
    	</div>
    </li>
  </ul>
</div>
