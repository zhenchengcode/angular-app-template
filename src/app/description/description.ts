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


  constructor(item_id:string, content:string, input_tokens:string[]) {
    this.item_id = item_id;
    this.content = content;
    this.find_token(content, input_tokens, ['color']);
  }






}
