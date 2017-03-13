<div class="breadcrumb-wrap">
  <ul class="breadcrumb">
    <li class="{{ $index == 0 ? 'nolink': '' }}" v-for="item in breadCrumbData">
      <a   href="javascript:;"
          v-link="{ path: item.router}"
          v-if="item.router">{{ item.name }}</a>
      <template v-else>{{ item.name }}</template>
    </li>
  </ul>
</div>