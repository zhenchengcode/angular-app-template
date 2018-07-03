import { Token } from '../token/token';
import {startOf} from "ngx-bootstrap/chronos/utils/start-end-of";
export class Description {

	item_id: string;

	/* Text of the description */
	content: string;

	/* Tokens: list of tokens */
	tokens: Array<Token>;

  /*
  * Generate a picker id for each token for keyboard short cut */
  generate_picker_id(token_count) {
    let picker_id = "";
    while(token_count>0){
      token_count = token_count - 1;
      picker_id = String.fromCharCode(token_count%26 + 97) + picker_id;
      token_count = Math.floor(token_count/26);
    }
    return picker_id;
  }


	/* Find those tokens from input that show up in this description */
  find_token (content:string, input_tokens:string[], label_candidates:string[]) {

    let ret_tokens = [];
    let token_count = 1;
    for (let token of input_tokens) {
      let token_replaced_underscore = token.split("_").join(" ");
      console.log(token_replaced_underscore)
      let pattern = new RegExp(token_replaced_underscore);
      let match = pattern.exec(content);
      if (match) {
        let matched_token:Token = {
          token_text: token_replaced_underscore,
          // token_type: 'unlabeled',
          token_start: match.index,
          token_end: match.index + token_replaced_underscore.length,
          token_labels: label_candidates,
          token_selected_label: label_candidates[0],
          token_picker_id: this.generate_picker_id(token_count)
        }
        ret_tokens.push(matched_token);
      }
      token_count = token_count + 1;
    }
    return ret_tokens;

  }

  /* Parse description into text segments (normal segments and tokens)
  *  assign each highlighted text an id */
  parse_description (content:string, tokens:Array<Token>) {

    // element is tuple: [string, number] 0 is normal text_segment, 1-n are class ids of highlight_token
    let token_segments: Array<Token> = [];

    let normal_start = 0;
    let token_id = 1;
    for (let token of tokens) {
      let token_start = token.token_start;
      let token_end = token.token_end;

      // normal segment
      if (normal_start < token_start) {

        token_segments.push(

          {
            token_text: content.substring(normal_start, token_start),
            token_start: normal_start,
            token_end: token_start,
            token_labels: [],
            token_selected_label: '',
            token_picker_id: ''
          }

        );
      }

      // highlight segment
      token_segments.push(
        {
          token_text: content.substring(token_start, token_end),
          token_start: token_start,
          token_end: token_end,
          token_labels: token.token_labels,
          token_selected_label: token.token_selected_label,
          token_picker_id: token.token_picker_id
        }

      );
      token_id = token_id + 1;
      normal_start = token_end + 1;
    }

    if (normal_start < content.length) { // last character is not in highlight_token
      token_segments.push(
        {
          token_text: content.substring(normal_start, content.length),
          token_start: normal_start,
          token_end: content.length,
          token_labels: [],
          token_selected_label: '',
          token_picker_id: ''
        }

      )
    }

    console.log(token_segments)
    return token_segments;

  }




  constructor(item_id:string, content:string, input_tokens:string[]) {
    this.item_id = item_id;
    this.content = content;
    this.tokens = this.find_token(content, input_tokens, ['color']);
  }






}
