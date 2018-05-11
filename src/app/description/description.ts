import { Token } from './token'
export class Description {

	item_id: string;

	/* Text of the description */
	content: string;

	/* Tokens: list of tokens */
	tokens: Array<Token>;

	/* Find those tokens from input that show up in this description */
  find_token (content:string, input_tokens:string[], label_candidates:string[]) {

    let ret_tokens = [];
    for (let token of input_tokens) {
      let token_replaced_underscore = token.split("_").join(" ");
      console.log(token_replaced_underscore)
      let pattern = new RegExp(token_replaced_underscore);
      let match = pattern.exec(content);
      if (match) {
        let matched_token:Token = {
          token_text: token_replaced_underscore,
          token_type: 'unlabeled',
          token_start: match.index,
          token_end: match.index + token_replaced_underscore.length,
          token_labels: label_candidates,
          token_selected_label: label_candidates[0],
        }
        ret_tokens.push(matched_token);
      }
    }
    return ret_tokens;

  }

  /* Parse description into text segments (normal segments and tokens)
  *  assign each highlighted text an id */
  parse_description (content:string, tokens:Array<Token>) {
    console.log(tokens)

    // element is tuple: [string, number] 0 is normal text_segment, 1-n are class ids of highlight_token
    let text_segment: Array<{}> = [];

    let normal_start = 0;
    let token_id = 1;
    for (let token of tokens) {
      let token_start = token.token_start;
      let token_end = token.token_end;

      // normal segment
      if (normal_start < token_start) {
        text_segment.push(
            {
              seg_text:content.substring(normal_start, token_start),
              highlight:0
            }
          );
      }

      // highlight segment
      text_segment.push(
        {
          seg_text:content.substring(token_start, token_end),
          highlight:token_id
        }
      );
      token_id = token_id + 1;
      normal_start = token_end + 1;
    }

    if (normal_start < content.length) { // last character is not in highlight_token
      text_segment.push(
        {
          seg_text:content.substring(normal_start, content.length),
          highlight:0
        }
      )
    }

    console.log(text_segment)
    return text_segment;

  }


  constructor(item_id:string, content:string, input_tokens:string[]) {
    this.item_id = item_id;
    this.content = content;
    this.tokens = this.find_token(content, input_tokens, ['color']);
  }






}
