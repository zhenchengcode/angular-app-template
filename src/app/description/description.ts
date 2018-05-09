import { Token } from './token'
export class Description {

	item_id: number;

	/* Text of the decription */
	content: string;

	/* Tokens: list of tokens */
	tokens: Array<Token>;

	/* Find those tokens from input that show up in this description */
  function find_tokens(content, input_tokens, possible_labels) {

    for (let token of input_tokens) {
      let token_replaced_underscore = token.split("_").join(" ");
      let pattern = new RegExp('\b'+token_replaced_underscore+'\b')
      let match = pattern.exec(content)
      if (match) {
        matched_token:Token = {
          token_text: token_replaced_underscore,
          token_type: 'unlabeled',
          token_start: match.index,
          token_end: match.index + token_replaced_underscore.length,
          token_labels: possible_labels,
          token_selected_label: possible_labels[0],
        }
        this.tokens.push(matched_token)
      }
    }
  }

  

}
