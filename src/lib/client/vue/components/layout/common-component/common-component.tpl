<bubble v-ref:bubble-tip :hide-right-now="true"></bubble>
<loading
    v-ref:loading
    type="rotate"
    :theme="loadingTheme"></loading>
<pop v-ref:alert type="alert"></pop>
<pop v-ref:tip
    type="tip"
    :header-display="false"
    :footer-display="false"></pop>