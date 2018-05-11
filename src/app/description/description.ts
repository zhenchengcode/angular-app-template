import { Token } from './token'
export class Description {

	item_id: string;

	/* Text of the description */
	content: string;

	/* Tokens: list of tokens */
	tokens: Array<Token>;

	/* Find those tokens from input that show up in this description */
  find_token (content:string, input_tokens:string[], label_candidates:string[]) {

    for (let token of input_tokens) {
      let token_replaced_underscore = token.split("_").join(" ");
      let pattern = new RegExp('\b'+token_replaced_underscore+'\b');
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
        this.tokens.push(matched_token);
      }
    }

  }

  /* Parse description into text segments (normal segments and tokens)
  *  assign each highlighted text an id */
  parse_description (content:string, tokens:Array<Token>) {

    // element is tuple: [string, number] 0 is normal text_segment, 1-n are class ids of highlight_token
    let text_segment: Array<string[]> = [];

    let normal_start = 0;
    let token_id = 1;
    for (let token in tokens) {
      token_start = token.token_start;
      token_end = token.token_end;

      let normal_token = [];
      if (normal_start < token_start) {
        normal_token = [content.substring(normal_start, token_start), 0];
      }
      if (normal_token.length > 0) {
        text_segment.push(normal_token);
      }
      highlight_token = [content.substring(token_start, token_end+1), token_id];
      text_segment.push(highlight_token);
      token_id = token_id + 1;
      normal_start = token_end + 1;
    }

    if (normal_start < content.length) { // last character is not in highlight_token
      text_segment.push([content.substring(normal_start, content.length), 0])
    }

    return text_segment;

  }


  constructor(item_id:string, content:string, input_tokens:string[]) {
    this.item_id = item_id;
    this.content = content;
    this.find_token(content, input_tokens, ['color']);
  }






}
