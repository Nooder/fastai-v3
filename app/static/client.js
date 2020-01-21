var el = x => document.getElementById(x);

let labels = ["'pink primrose'", "'hard-leaved pocket orchid'", "'canterbury bells'", "'sweet pea'", "'english marigold'", "'tiger lily'", "'moon orchid'", "'bird of paradise'", "'monkshood'", "'globe thistle'", "'snapdragon'", '"colt\'s foot"', "'king protea'", "'spear thistle'", "'yellow iris'", "'globe-flower'", "'purple coneflower'", "'peruvian lily'", "'balloon flower'", "'giant white arum lily'", "'fire lily'", "'pincushion flower'", "'fritillary'", "'red ginger'", "'grape hyacinth'", "'corn poppy'", "'prince of wales feathers'", "'stemless gentian'", "'artichoke'", "'sweet william'", "'carnation'", "'garden phlox'", "'love in the mist'", "'mexican aster'", "'alpine sea holly'", "'ruby-lipped cattleya'", "'cape flower'", "'great masterwort'", "'siam tulip'", "'lenten rose'", "'barbeton daisy'", "'daffodil'", "'sword lily'", "'poinsettia'", "'bolero deep blue'", "'wallflower'", "'marigold'", "'buttercup'", "'oxeye daisy'", "'common dandelion'", "'petunia'", "'wild pansy'", "'primula'", "'sunflower'", "'pelargonium'", "'bishop of llandaff'", "'gaura'", "'geranium'", "'orange dahlia'", "'pink-yellow dahlia?'", "'cautleya spicata'", "'japanese anemone'", "'black-eyed susan'", "'silverbush'", "'californian poppy'", "'osteospermum'", "'spring crocus'", "'bearded iris'", "'windflower'", "'tree poppy'", "'gazania'", "'azalea'", "'water lily'", "'rose'", "'thorn apple'", "'morning glory'", "'passion flower'", "'lotus'", "'toad lily'", "'anthurium'", "'frangipani'", "'clematis'", "'hibiscus'", "'columbine'", "'desert-rose'", "'tree mallow'", "'magnolia'", "'cyclamen '", "'watercress'", "'canna lily'", "'hippeastrum '", "'bee balm'", "'ball moss'", "'foxglove'", "'bougainvillea'", "'camellia'", "'mallow'", "'mexican petunia'", "'bromelia'", "'blanket flower'", "'trumpet creeper'", "'blackberry lily'"]

let make_ul = (arr) => {
  let list = document.createElement('ul');
  for (let i = 0; i < arr.length; i++) {
    let item = document.createElement('li');
    item.appendChild(document.createTextNode(arr[i]));
    list.appendChild(item);
  }
  return list;
}

el("gen-list-desc").appendChild(make_ul(labels))

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      el("result-label").innerHTML = `Result = ${response["result"]}`;
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

