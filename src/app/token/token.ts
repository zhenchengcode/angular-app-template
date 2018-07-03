export class Token {
	token_text: string;

  /* Token-type: does this token has a drop down (needs to be labeled) only unlabeled token will have a drop down
   * labeled / unlabeled */

	token_start: number;
	token_end: number;

	token_labels: string[]; // labeled=>len(token_labels)==0, unlabeled=>len(token_labels)>0
	token_selected_label: string;

	token_picker_id: string;
	constructor(){}
}