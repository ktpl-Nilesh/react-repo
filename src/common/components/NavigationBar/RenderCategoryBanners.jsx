import parse from "html-react-parser";
import isArray from "lodash/isArray";

export function RenderCategoryBanners(props) {
  let parseData = parse(props.html);
  if (isArray(parseData)) {
    return parseData.map((data) => {
      if (data.props && data.props["data-content-type"] === "html") {
        return parse(data.props.children);
      }
      return data;
    });
  }
  if (parseData.props && parseData.props["data-content-type"] === "html") {
    return parse(parseData.props.children);
  }
  return parseData;
}
