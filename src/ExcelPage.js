import React, { Component } from 'react'
import { Upload, Modal } from 'antd'
import { ExcelRenderer } from 'react-excel-renderer'
import Phrase from './Phrase'
import styled from '@emotion/styled'
import { findByLabelText } from '@testing-library/dom'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-around;
  border: 2px solid black;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 10px 10px 23px -4px rgba(0, 0, 0, 0.22);
  -webkit-box-shadow: 10px 10px 23px -4px rgba(0, 0, 0, 0.22);
  -moz-box-shadow: 10px 10px 23px -4px rgba(0, 0, 0, 0.22);
`

const RandomButton = styled.button`
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  border: 2px solid gray;
  color: white;
  background-color: rgb(12, 134, 104);
  padding: 8px 20px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`

const UploadButton = styled.button`
  border: 2px solid gray;
  color: white;
  background-color: rgb(0, 100, 150);
  padding: 8px 20px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: 10px 0;
`

const ListContainer = styled.ul`
  font-size: 1.2em;
  line-height: 1.5;
`

const ListContainerTitle = styled.p`
  margin: 0;
  font-size: 1.3em;
  text-decoration: underline;
`

export default class ExcelPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: {
        places: [],
        adjectives: [],
        nouns: [],
        verbs: []
      },
      showPhrase: false,
      errorMessage: null
    }
  }

  checkFile(file) {
    let errorMessage = ''
    if (!file || !file[0]) {
      return
    }
    const isExcel =
      file[0].type === 'application/vnd.ms-excel' ||
      file[0].type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    if (!isExcel) {
      errorMessage = 'Only Excel files are supported!'
    }

    const isLt2M = file[0].size / 1024 / 1024 < 2
    if (!isLt2M) {
      errorMessage = 'File must be smaller than 2MB!'
    }

    return errorMessage
  }

  fileHandler = (fileList) => {
    let fileObj = fileList
    if (!fileObj) {
      this.setState({
        errorMessage: 'No file uploaded!'
      })
      return false
    }

    if (
      !(
        fileObj.type === 'application/vnd.ms-excel' ||
        fileObj.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    ) {
      this.setState({
        errorMessage: 'Unknown file format. Only Excel files are supported!'
      })
      return false
    }

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err)
      } else {
        console.log(resp)
        const content = { places: [], adjectives: [], nouns: [], verbs: [] }

        const cleanedRows = resp.rows
          .slice(1, resp.rows.length)
          .filter((row) => {
            return row.length > 0
          })

        cleanedRows.forEach((row) => {
          content.places.push(row[0])
          content.adjectives.push(row[1])
          content.nouns.push(row[2])
          content.verbs.push(row[3])
        })

        this.setState({ content })
      }
    })
    return false
  }

  renderRoulette() {
    return (
      <>
        <RandomButton onClick={this.generateRandomPhrase}>
          Create random phrase
        </RandomButton>
        <Phrase content={this.state.content} />
      </>
    )
  }

  generateRandomPhrase() {
    const intervalDurations = []
    for (let i = 1; i < 5; i++) {
      intervalDurations.push(Math.floor(Math.random() * (180 - 140 + 1)) + 140)
    }
    const randomArrow = Math.floor(Math.random() * 2) + 1

    const placesInterval = setInterval(() => {
      if (randomArrow === 1) {
        document.getElementById('places_up').click()
      } else if (randomArrow === 2) {
        document.getElementById('places_down').click()
      }
    }, intervalDurations[0])

    const adjectivesInterval = setInterval(() => {
      if (randomArrow === 1) {
        document.getElementById('adjectives_down').click()
      } else if (randomArrow === 2) {
        document.getElementById('adjectives_up').click()
      }
    }, intervalDurations[1])

    const nounsInterval = setInterval(() => {
      if (randomArrow === 1) {
        document.getElementById('nouns_up').click()
      } else if (randomArrow === 2) {
        document.getElementById('nouns_down').click()
      }
    }, intervalDurations[2])

    const verbsInterval = setInterval(() => {
      if (randomArrow === 1) {
        document.getElementById('verbs_down').click()
      } else if (randomArrow === 2) {
        document.getElementById('verbs_up').click()
      }
    }, intervalDurations[3])

    setTimeout(() => {
      clearInterval(placesInterval)
      clearInterval(adjectivesInterval)
      clearInterval(nounsInterval)
      clearInterval(verbsInterval)
    }, 1000)
  }

  render() {
    return (
      <>
        <MainContainer>
          <h1>Japanese Random Phrases Generator</h1>
          {this.state.content.places.length === 0 ? (
            <ListContainer>
              <ListContainerTitle>Rules:</ListContainerTitle>
              <li>
                The file <span style={{ fontWeight: 'bold' }}>needs</span> to
                have 4 columns.
              </li>
              <li>You can only upload Excel files.</li>
              <li>
                (If you are working with Mac's Numbers, you can export the file
                to Excel in File --{'>'} Export to --{'>'} Excel...).
              </li>
              <li>File must be smaller than 2MB.</li>
              <li>
                You can download the empty template to fill with words of your
                own, or you can use our pre-filled table to try the game out!
              </li>
              <li>
                After uploading the table, you will be able to generate random
                phrases. Feel free to move each column independently as well.
              </li>
            </ListContainer>
          ) : null}

          <LinksContainer>
            <div>
              <a
                href="https://res.cloudinary.com/dxhk9k9z4/raw/upload/v1623101138/japanese_game_example_wokanjis_table_etrqhz.xlsx"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download filled sample (without Kanjis)
              </a>
            </div>
            <div>
              <a
                href="https://res.cloudinary.com/dxhk9k9z4/raw/upload/v1623101138/japanese_game_example_table_fa6qoq.xlsx"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download filled sample (with Kanjis)
              </a>
            </div>
            <div>
              <p>Download Excel's empty template for the game here:</p>
              <a
                href="https://res.cloudinary.com/dxhk9k9z4/raw/upload/v1623101138/japanese_game_template_asblto.xlsx"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download template
              </a>
            </div>
          </LinksContainer>
          <div style={{ textAlign: 'center' }}>
            <Upload
              name="file"
              beforeUpload={this.fileHandler}
              onRemove={() =>
                this.setState({
                  content: {
                    places: [],
                    adjectives: [],
                    nouns: [],
                    verbs: []
                  }
                })
              }
              multiple={false}
            >
              {this.state.content.places.length === 0 ? (
                <UploadButton>Click to Upload Excel File</UploadButton>
              ) : null}
            </Upload>
          </div>
        </MainContainer>

        {this.state.content.places.length !== 0 ? this.renderRoulette() : null}
      </>
    )
  }
}
