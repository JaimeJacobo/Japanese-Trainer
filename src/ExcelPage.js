import React, { Component } from "react";
import { Row, Col, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";


export default class ExcelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      errorMessage: null,
      columns: [
        {
          title: "PLACE",
          dataIndex: "place",
        },
        {
          title: "ADJECTIVE",
          dataIndex: "adjective",
        },
        {
          title: "NOUN",
          dataIndex: "noun",
        },
        {
          title: "VERB",
          dataIndex: "verb",
        }
      ]
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
        errorMessage: "No file uploaded!"
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
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const newRows = resp.rows.slice(1).filter((row, index) => {
          if (row.length !== 0) {
            return {
              key: index,
              place: row[0],
              adjective: row[1],
              noun: row[2],
              verb: row[3]
            };
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!"
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null
          });
        }
      }
    });
    return false;
  };

  render() {
    return (
      <>
        <h1>Importing Excel Component</h1>
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
            onRemove={() => this.setState({ rows: [], cols: [] })}
            multiple={false}
          >
            <button>
              Click to Upload Excel File
            </button>
          </Upload>
        </div>
      </>
    );
  }
}
