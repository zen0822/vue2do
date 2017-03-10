<div class="select-city-stage
    {{ theme | themeClass }}">
  <div class="inline" :class="{'width2':!noDis,'width3':noDis}">
    <drop-menu 
      :option-items="provincesArr"
      query-name="province"
      v-ref:pro
      >
    </drop-menu>
  </div>
  <div class="inline" :class="{'width2':!noDis,'width3':noDis}">
    <drop-menu 
      :option-items="citiesArr" 
      query-name="city"
      v-ref:cit
      ></drop-menu>
  </div>
  <div v-show="noDis" class="inline" :class="{'width2':!noDis,'width3':noDis}">
    <drop-menu 
      :option-items="districtsArr" 
      query-name="district"
      v-ref:dis
      ></drop-menu>
  </div>
</div>