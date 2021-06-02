import React, { Component } from "react";
import { Row, Col, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import Phrase from "./Phrase";

export default class ExcelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        places: [],
        adjectives: [],
        nouns: [],
        verbs: [],
      },
      showPhrase: false,
      errorMessage: null,
    };
  }

  checkFile(file) {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    // console.log("file", file[0].type);
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    // console.log("errorMessage", errorMessage);
    return errorMessage;
  }

  fileHandler = (fileList) => {
    // console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!",
      });
      return false;
    }
    // console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!",
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
        const content = { places: [], adjectives: [], nouns: [], verbs: [] };
        const cleanedRows = resp.rows.filter((row) => {
          return row.length > 0;
        });
        cleanedRows.forEach((row) => {
          content.places.push(row[0]);
          content.adjectives.push(row[1]);
          content.nouns.push(row[2]);
          content.verbs.push(row[3]);
        });
        this.setState({ content });
      }
    });
    return false;
  };

  renderPlayButton() {
    return (
      <>
        <button onClick={() => this.setState({ showPhrase: true })}>
          Load random roulette
        </button>
        <button onClick={this.generateRandomPhrase}>
          Create random phrase
        </button>
      </>
    );
  }

  generateRandomPhrase() {
    const randomNumber = Math.floor(Math.random() * 10);
    for (let i = 0; i < randomNumber; i++) {
      setTimeout(() => {
        document.getElementById("places_up").click();
      }, 2000);
    }
  }

  render() {
    return (
      <>
        <h1>Get Random Phrases</h1>
        <Row gutter={16}>
          <Col span={8}>
            <a
              href="https://res.cloudinary.com/bryta/raw/upload/v1562751445/Sample_Excel_Sheet_muxx6s.xlsx"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Sample excel sheet
            </a>
          </Col>
        </Row>
        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() =>
              this.setState({
                content: {
                  places: [],
                  adjectives: [],
                  nouns: [],
                  verbs: [],
                },
              })
            }
            multiple={false}
          >
            <button>Click to Upload Excel File</button>
          </Upload>
          {this.state.content.places.length !== 0
            ? this.renderPlayButton()
            : null}
          {this.state.showPhrase ? (
            <Phrase content={this.state.content} />
          ) : null}
        </div>
      </>
    );
  }
}
