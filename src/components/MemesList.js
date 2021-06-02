import React from "react";

function MemesList() {
  return (
    <>
      <div class="row">
        <div class="col-lg-6">
          <form>
            <div class="form-group">
              <label for="top-text">Meme</label>
              <select id="meme" class="form-control">
                <option value="10-Guy">10 Guy</option>
              </select>
            </div>
            <div class="form-group">
              <label for="top-text">Top Text</label>
              <input
                type="text"
                class="form-control"
                id="top-text"
                placeholder="This text will appear on the top"
                value="Top text"
              />
            </div>
            <div class="form-group">
              <label for="top-text">Bottom Text</label>
              <input
                type="text"
                class="form-control"
                id="bottom-text"
                placeholder="This text will appear on the bottom"
                value="Bottom text"
              />
            </div>
            <div class="form-group">
              <label for="top-text">Link</label>
              <input type="text" class="form-control" id="api-link" readonly />
              <small>
                To access the API without the watermark, click{" "}
                <a href="https://rapidapi.com/meme-generator-api-meme-generator-api-default/api/meme-generator">
                  here
                </a>
                .
              </small>
            </div>
            <button type="submit" class="btn btn-primary">
              Generate
            </button>
            <button type="button" class="btn btn-primary" onclick="download()">
              <i class="fa fa-download"></i> Download
            </button>
          </form>
        </div>
        <div class="col-lg-6">
          <img id="meme-image" src="data:," alt="memes" />
        </div>
      </div>
    </>
  );
}

export default MemesList;
