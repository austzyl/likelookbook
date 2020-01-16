export class DropdownLabelValue {
  label: string;
  value: any;
  id?: string;

  constructor(label: string, value: any, id?: string) {
    this.label = label;
    this.value = value;
    if (id) {
      this.id = id;
    }
  }
}
