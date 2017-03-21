;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-close" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-spread" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M890.336 352.245c-12.576-12.416-32.8-12.352-45.248 0.192l-327.84 330.848-332.416-329.44c-12.576-12.448-32.8-12.352-45.28 0.192-12.448 12.576-12.352 32.832 0.192 45.28l353.312 350.112c0.544 0.544 1.248 0.672 1.792 1.184 0.128 0.128 0.16 0.288 0.288 0.416 6.24 6.176 14.4 9.28 22.528 9.28 8.224 0 16.48-3.168 22.72-9.472l350.112-353.312c12.48-12.576 12.384-32.832-0.16-45.28z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-back" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-right" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-fold" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M887.328 617.152 533.952 267.008c-0.512-0.512-1.216-0.672-1.76-1.152-0.128-0.128-0.16-0.32-0.288-0.448-12.576-12.416-32.832-12.352-45.28 0.192L136.512 618.944c-12.448 12.576-12.352 32.8 0.192 45.248 6.24 6.176 14.4 9.28 22.528 9.28 8.224 0 16.48-3.168 22.72-9.472l327.84-330.816 332.48 329.408c6.24 6.176 14.368 9.28 22.528 9.28 8.256 0 16.48-3.168 22.72-9.472C899.968 649.856 899.872 629.6 887.328 617.152z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-search" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M83.064 62.638v0z"  ></path>' +
    '' +
    '<path d="M103.49 62.638v0z"  ></path>' +
    '' +
    '<path d="M123.914 62.638v0z"  ></path>' +
    '' +
    '<path d="M144.341 62.638v0z"  ></path>' +
    '' +
    '<path d="M164.766 62.638v0z"  ></path>' +
    '' +
    '<path d="M185.192 62.638v0z"  ></path>' +
    '' +
    '<path d="M205.617 62.638v0z"  ></path>' +
    '' +
    '<path d="M226.043 62.638v0z"  ></path>' +
    '' +
    '<path d="M246.468 62.638v0z"  ></path>' +
    '' +
    '<path d="M266.893 62.638v0z"  ></path>' +
    '' +
    '<path d="M287.319 62.638v0z"  ></path>' +
    '' +
    '<path d="M307.745 62.638v0z"  ></path>' +
    '' +
    '<path d="M328.17 62.638v0z"  ></path>' +
    '' +
    '<path d="M348.596 62.638v0z"  ></path>' +
    '' +
    '<path d="M369.021 62.638v0z"  ></path>' +
    '' +
    '<path d="M389.447 62.638v0z"  ></path>' +
    '' +
    '<path d="M409.872 62.638v0z"  ></path>' +
    '' +
    '<path d="M430.298 62.638v0z"  ></path>' +
    '' +
    '<path d="M450.723 62.638v0z"  ></path>' +
    '' +
    '<path d="M471.149 62.638v0z"  ></path>' +
    '' +
    '<path d="M491.575 62.638v0z"  ></path>' +
    '' +
    '<path d="M512 62.638v0z"  ></path>' +
    '' +
    '<path d="M532.425 62.638v0z"  ></path>' +
    '' +
    '<path d="M552.851 62.638v0z"  ></path>' +
    '' +
    '<path d="M573.277 62.638v0z"  ></path>' +
    '' +
    '<path d="M593.702 62.638v0z"  ></path>' +
    '' +
    '<path d="M614.128 62.638v0z"  ></path>' +
    '' +
    '<path d="M634.553 62.638v0z"  ></path>' +
    '' +
    '<path d="M654.979 62.638v0z"  ></path>' +
    '' +
    '<path d="M675.404 62.638v0z"  ></path>' +
    '' +
    '<path d="M695.83 62.638v0z"  ></path>' +
    '' +
    '<path d="M716.255 62.638v0z"  ></path>' +
    '' +
    '<path d="M736.681 62.638v0z"  ></path>' +
    '' +
    '<path d="M757.107 62.638v0z"  ></path>' +
    '' +
    '<path d="M777.532 62.638v0z"  ></path>' +
    '' +
    '<path d="M797.957 62.638v0z"  ></path>' +
    '' +
    '<path d="M818.383 62.638v0z"  ></path>' +
    '' +
    '<path d="M838.808 62.638v0z"  ></path>' +
    '' +
    '<path d="M859.234 62.638v0z"  ></path>' +
    '' +
    '<path d="M879.659 62.638v0z"  ></path>' +
    '' +
    '<path d="M900.086 62.638v0z"  ></path>' +
    '' +
    '<path d="M920.51 62.638v0z"  ></path>' +
    '' +
    '<path d="M940.936 62.638v0z"  ></path>' +
    '' +
    '<path d="M62.638 83.064v0z"  ></path>' +
    '' +
    '<path d="M62.638 103.49v0z"  ></path>' +
    '' +
    '<path d="M62.638 123.914v0z"  ></path>' +
    '' +
    '<path d="M62.638 144.341v0z"  ></path>' +
    '' +
    '<path d="M62.638 164.766v0z"  ></path>' +
    '' +
    '<path d="M62.638 185.192v0z"  ></path>' +
    '' +
    '<path d="M62.638 205.617v0z"  ></path>' +
    '' +
    '<path d="M62.638 226.043v0z"  ></path>' +
    '' +
    '<path d="M62.638 246.468v0z"  ></path>' +
    '' +
    '<path d="M62.638 266.893v0z"  ></path>' +
    '' +
    '<path d="M62.638 287.319v0z"  ></path>' +
    '' +
    '<path d="M62.638 307.745v0z"  ></path>' +
    '' +
    '<path d="M62.638 328.17v0z"  ></path>' +
    '' +
    '<path d="M62.638 348.596v0z"  ></path>' +
    '' +
    '<path d="M62.638 369.021v0z"  ></path>' +
    '' +
    '<path d="M62.638 389.447v0z"  ></path>' +
    '' +
    '<path d="M62.638 409.872v0z"  ></path>' +
    '' +
    '<path d="M62.638 430.298v0z"  ></path>' +
    '' +
    '<path d="M62.638 450.723v0z"  ></path>' +
    '' +
    '<path d="M62.638 471.149v0z"  ></path>' +
    '' +
    '<path d="M62.638 491.575v0z"  ></path>' +
    '' +
    '<path d="M62.638 512v0z"  ></path>' +
    '' +
    '<path d="M62.638 532.425v0z"  ></path>' +
    '' +
    '<path d="M62.638 552.851v0z"  ></path>' +
    '' +
    '<path d="M62.638 573.277v0z"  ></path>' +
    '' +
    '<path d="M62.638 593.702v0z"  ></path>' +
    '' +
    '<path d="M62.638 614.128v0z"  ></path>' +
    '' +
    '<path d="M62.638 634.553v0z"  ></path>' +
    '' +
    '<path d="M62.638 654.979v0z"  ></path>' +
    '' +
    '<path d="M62.638 675.404v0z"  ></path>' +
    '' +
    '<path d="M62.638 695.83v0z"  ></path>' +
    '' +
    '<path d="M62.638 716.255v0z"  ></path>' +
    '' +
    '<path d="M62.638 736.681v0z"  ></path>' +
    '' +
    '<path d="M62.638 757.107v0z"  ></path>' +
    '' +
    '<path d="M62.638 777.532v0z"  ></path>' +
    '' +
    '<path d="M62.638 797.957v0z"  ></path>' +
    '' +
    '<path d="M62.638 818.383v0z"  ></path>' +
    '' +
    '<path d="M62.638 838.808v0z"  ></path>' +
    '' +
    '<path d="M62.638 859.234v0z"  ></path>' +
    '' +
    '<path d="M62.638 879.659v0z"  ></path>' +
    '' +
    '<path d="M62.638 900.086v0z"  ></path>' +
    '' +
    '<path d="M62.638 920.51v0z"  ></path>' +
    '' +
    '<path d="M62.638 940.936v0z"  ></path>' +
    '' +
    '<path d="M961.362 879.659c0 81.702-81.702 81.702-81.702 81.702l-233.75-233.709c-60.582 44.037-134.932 70.305-215.612 70.305-203.070 0-367.659-164.589-367.659-367.659s164.589-367.659 367.659-367.659 367.659 164.589 367.659 367.659c0 80.681-26.308 155.030-70.346 215.653l233.75 233.709zM430.298 144.341c-157.929 0-285.957 128.028-285.957 285.957s128.028 285.957 285.957 285.957 285.957-128.028 285.957-285.957-128.028-285.957-285.957-285.957z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-spinner" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M392 173.333c0 66.274 53.726 120 120 120s120-53.726 120-120c0-66.274-53.726-120-120-120-66.274 0-120 53.726-120 120zM646.559 278.774c0 66.274 53.726 120 120 120s120-53.726 120-120c0-66.274-53.726-120-120-120-66.274 0-120 53.726-120 120zM812 533.333c0 33.137 26.863 60 60 60s60-26.863 60-60c0-33.137-26.863-60-60-60-33.137 0-60 26.863-60 60zM706.559 787.892c0 33.137 26.863 60 60 60s60-26.863 60-60c0-33.137-26.863-60-60-60-33.137 0-60 26.863-60 60zM452.002 893.333c0 33.137 26.863 60 60 60s60-26.863 60-60c0-33.137-26.863-60-60-60-33.137 0-60 26.863-60 60zM197.442 787.892c0 33.137 26.863 60 60 60s60-26.863 60-60c0-33.137-26.863-60-60-60-33.137 0-60 26.863-60 60zM167.442 278.774c0 49.705 40.295 90 90 90s90-40.295 90-90c0-49.705-40.295-90-90-90-49.705 0-90 40.295-90 90zM84.5 533.333c0 37.28 30.22 67.5 67.5 67.5s67.5-30.22 67.5-67.5c0-37.28-30.22-67.5-67.5-67.5-37.28 0-67.5 30.22-67.5 67.5z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-forward-end" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M890.88 135.229c-39.242 0-71.081 31.613-71.081 70.626v612.286c0 39.013 31.84 70.626 71.081 70.626 39.198 0 70.99-31.613 70.99-70.626v-612.285c0.001-39.013-31.792-70.627-70.99-70.627zM62.128 182.328v659.338c0 48.608 47.351 47.1 47.351 47.1h47.348l568.317-329.693v-94.151c0 0-569.779-329.692-615.666-329.692-45.867 0-47.351 47.1-47.351 47.1z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-backward" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M946.879 136.977c-13.504-7.124-29.993-6.256-42.668 2.362l-266.695 181.442v-147.184c0-15.367-8.492-29.412-22.038-36.621-13.504-7.124-29.993-6.256-42.668 2.362l-497.103 338.196c-11.351 7.705-18.144 20.547-18.144 34.258s6.794 26.554 18.144 34.258l497.103 338.362c7.002 4.764 15.121 7.207 23.281 7.207 6.627 0 13.297-1.573 19.387-4.805 13.547-7.167 22.038-21.294 22.038-36.621v-147.308l266.695 181.524c7.002 4.764 15.121 7.207 23.281 7.207 6.627 0 13.297-1.573 19.387-4.805 13.547-7.167 22.038-21.294 22.038-36.621v-676.598c0-15.367-8.492-29.412-22.038-36.621z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-forward" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M948.293 477.742l-497.103-338.402c-12.635-8.617-29.081-9.487-42.668-2.362-13.547 7.207-22.038 21.25-22.038 36.621v147.308l-266.695-181.567c-12.676-8.617-29.081-9.487-42.668-2.362-13.547 7.207-22.038 21.25-22.038 36.621v676.598c0 15.327 8.492 29.454 22.038 36.621 6.091 3.23 12.759 4.805 19.387 4.805 8.16 0 16.322-2.444 23.281-7.167l266.695-181.442v147.184c0 15.327 8.492 29.454 22.038 36.621 6.091 3.23 12.759 4.805 19.387 4.805 8.16 0 16.322-2.444 23.281-7.167l497.103-338.238c11.351-7.664 18.144-20.505 18.144-34.218s-6.794-26.554-18.144-34.258z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-arrow" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M277.888 61.632h481.632l-9.312 467.328 208.784 1.232-439.968 437.504-444.352-446.816 207.568-2.48z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-circle-check-o" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 65.983389c-245.919634 0-446.016611 200.095256-446.016611 446.016611 0 245.952318 200.064292 446.016611 446.016611 446.016611S958.016611 757.952318 958.016611 512C958.016611 266.080366 757.952318 65.983389 512 65.983389zM512 894.016611c-210.655557 0-382.016611-171.392017-382.016611-382.016611 0-210.655557 171.359333-382.016611 382.016611-382.016611 210.624593 0 382.016611 171.359333 382.016611 382.016611C894.016611 722.624593 722.624593 894.016611 512 894.016611z"  ></path>' +
    '' +
    '<path d="M512 352.00086c-88.223841 0-160.00086 71.775299-160.00086 159.99914s71.775299 160.00086 160.00086 160.00086 160.00086-71.775299 160.00086-160.00086S600.223841 352.00086 512 352.00086z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-square-o" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M832 928.00086l-640 0c-52.9288 0-96.00086-43.07206-96.00086-95.99914l0-640c0-52.9288 43.07206-96.00086 96.00086-96.00086l640 0c52.92708 0 95.99914 43.07206 95.99914 96.00086l0 640C928.00086 884.9288 884.9288 928.00086 832 928.00086zM192 160.00086c-17.632039 0-32.00086 14.368821-32.00086 32.00086l0 640c0 17.664722 14.368821 31.99914 32.00086 31.99914l640 0c17.664722 0 31.99914-14.336138 31.99914-31.99914l0-640c0-17.632039-14.336138-32.00086-31.99914-32.00086L192 160.00086z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-square-check-o" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M726.976697 393.184142c-12.54369-12.447359-32.831716-12.320065-45.248112 0.25631L448.447252 629.248757l-103.26354-106.112189c-12.352748-12.703669-32.60809-12.927295-45.248112-0.639914-12.672705 12.320065-12.959978 32.60809-0.639914 45.248112l126.016611 129.503454c0.063647 0.096331 0.192662 0.096331 0.25631 0.192662 0.063647 0.063647 0.096331 0.192662 0.159978 0.25631 2.016073 1.983389 4.512082 3.19957 6.880796 4.544765 1.247144 0.672598 2.239699 1.792447 3.519527 2.303346 3.872168 1.599785 8.000645 2.399677 12.096439 2.399677 4.06483 0 8.12794-0.799892 11.967424-2.33603 1.247144-0.512619 2.208735-1.536138 3.392232-2.176052 2.399677-1.343475 4.895686-2.528692 6.944443-4.544765 0.063647-0.063647 0.096331-0.192662 0.192662-0.25631 0.063647-0.096331 0.159978-0.127295 0.25631-0.192662l256.223626-259.008628C739.647682 425.888563 739.520387 405.631501 726.976697 393.184142z"  ></path>' +
    '' +
    '<path d="M832 928.00086l-640 0c-52.9288 0-96.00086-43.07206-96.00086-95.99914l0-640c0-52.9288 43.07206-96.00086 96.00086-96.00086l640 0c52.92708 0 95.99914 43.07206 95.99914 96.00086l0 640C928.00086 884.9288 884.9288 928.00086 832 928.00086zM192 160.00086c-17.632039 0-32.00086 14.368821-32.00086 32.00086l0 640c0 17.664722 14.368821 31.99914 32.00086 31.99914l640 0c17.664722 0 31.99914-14.336138 31.99914-31.99914l0-640c0-17.632039-14.336138-32.00086-31.99914-32.00086L192 160.00086z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-circle-o" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiangshang1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M325.456471 862.280661"  ></path>' +
    '' +
    '<path d="M882.057788 862.280661"  ></path>' +
    '' +
    '<path d="M236.028491 877.160382"  ></path>' +
    '' +
    '<path d="M960.132455 877.160382"  ></path>' +
    '' +
    '<path d="M63.683483 788.736998"  ></path>' +
    '' +
    '<path d="M958.469023 788.736998"  ></path>' +
    '' +
    '<path d="M64.77753 858.792098"  ></path>' +
    '' +
    '<path d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z"  ></path>' +
    '' +
    '<path d="M959.523505 858.792098"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiangxia1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M325.456471 862.280661"  ></path>' +
    '' +
    '<path d="M882.057788 862.280661"  ></path>' +
    '' +
    '<path d="M236.028491 877.160382"  ></path>' +
    '' +
    '<path d="M960.132455 877.160382"  ></path>' +
    '' +
    '<path d="M63.683483 788.736998"  ></path>' +
    '' +
    '<path d="M958.469023 788.736998"  ></path>' +
    '' +
    '<path d="M64.77753 858.792098"  ></path>' +
    '' +
    '<path d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z"  ></path>' +
    '' +
    '<path d="M959.523505 858.792098"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-arrow-moving" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 965.334l373.333-533.333h-160v-106.667h-426.667v106.667h-160l373.333 533.333zM725.334 165.333h-426.667v106.667h426.667v-106.667zM725.334 58.666h-426.667v53.334h426.667v-53.334z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-download" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M494.933333 782.933333c2.133333 2.133333 4.266667 4.266667 8.533334 6.4h8.533333c6.4 0 10.666667-2.133333 14.933333-6.4l2.133334-2.133333 275.2-275.2c8.533333-8.533333 8.533333-21.333333 0-29.866667-8.533333-8.533333-21.333333-8.533333-29.866667 0L533.333333 716.8V128c0-12.8-8.533333-21.333333-21.333333-21.333333s-21.333333 8.533333-21.333333 21.333333v588.8L249.6 475.733333c-8.533333-8.533333-21.333333-8.533333-29.866667 0-8.533333 8.533333-8.533333 21.333333 0 29.866667l275.2 277.333333zM853.333333 874.666667H172.8c-12.8 0-21.333333 8.533333-21.333333 21.333333s8.533333 21.333333 21.333333 21.333333H853.333333c12.8 0 21.333333-8.533333 21.333334-21.333333s-10.666667-21.333333-21.333334-21.333333z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-backward-start" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M133.12 888.771c39.242 0 71.081-31.613 71.081-70.626v-612.287c0-39.012-31.84-70.626-71.081-70.626-39.198 0-70.99 31.613-70.99 70.627v612.285c-0.001 39.013 31.792 70.627 70.99 70.627zM961.872 841.672v-659.337c0-48.608-47.351-47.1-47.351-47.1h-47.348l-568.317 329.693v94.151c0 0 569.779 329.692 615.666 329.692 45.867 0 47.351-47.1 47.351-47.1z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)