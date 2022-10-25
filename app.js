console.log("Let's get this party started!");

const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* use ajax result to add a gif */

function addGif(res) {
    try {
        let numResults = res.data.length;
        if (numResults) {
            let randomIdx = Math.floor(Math.random() * numResults);
            let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
            let $newGif = $("<img>", {
            src: res.data[randomIdx].images.original.url,
            class: "w-100"
            });
            $newCol.append($newGif);
            $gifArea.append($newCol);
        }
    } catch (error) {
        console.log(error);
        alert("GIF NOT FOUND!");
        }
    }

/* handle form submission: clear search box & make ajax call */

$("form").on("submit", async function(evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "e8HkJCZ7TE9vjCGnAoh5L30dN31DoKrm"
    }
  });
  addGif(response.data);
});

/* remove gif */

$("#remove").on("click", function() {
  $gifArea.empty();
});