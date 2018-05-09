export class Token {
	token_text: string;

  /* Token-type: does this token has a drop down (needs to be labeled) only unlabeled token will have a drop down
   * labeled / unlabeled */
  token_type: string;

	token_start: number;
	token_end: number;

	token_labels: string[];
	token_selected_label: string;
}