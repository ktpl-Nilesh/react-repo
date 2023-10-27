import parse from "html-react-parser"
import isArray from "lodash/isArray"

export default function CMSBlock(props) {
  let parseData = parse(props.html)
  if (isArray(parseData)) {
    return parseData.map((data) => {
      if (data.props && data.props["data-content-type"] === "html") {
        return data.props.children
      }
      return data
    })
  }
  if (parseData.props && parseData.props["data-content-type"] === "html") {
    return parseData.props.children
  }
  return parseData
}
