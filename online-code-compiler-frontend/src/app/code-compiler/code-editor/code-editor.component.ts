import { Component, ViewChild, ElementRef, OnInit , Input, AfterViewInit} from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/theme-github';
// import webpack resolver to dynamically load modes & themes
// import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
// import "ace-builds/esm-resolver";
import { ILanguage, IVersionConfiguration } from '../../interfaces/editor-specific.interface';
import { DataHandlerService } from '../../services/dataHandler/data-handler.service';
import { themes } from '../../constants';

const THEME = themes[0].theme;
const LANG = 'ace/mode/python';
const INIT_CONTENT = '';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss'
})
export class CodeEditorComponent implements OnInit, AfterViewInit{
  private codeEditor!: ace.Ace.Editor;
  private editorBeautify: any;
  @ViewChild('codeEditor') codeEditorElmRef!: ElementRef;
  @Input() content!: string;
  languages: IVersionConfiguration[] = [];
  languageModes: String[] = [];
  selectedLanguageDetails!: IVersionConfiguration;
  currentCode = '';
  codeOutput = '';
  themeOptions = themes;

  constructor(private dataService: DataHandlerService) {
    console.log('codeeditor', this.codeEditorElmRef);
    this.languages = [];
  }

  ngAfterViewInit(){
    ace.require('ace/ext/language_tools');
    this.editorBeautify = ace.require('ace/ext/beautify')
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeEditor = this.createCodeEditor(element, editorOptions);
    console.log('code editor created-->', this.codeEditor);
    this.codeEditor.on('blur', () => {
      this.getContent();
    })
  }

  ngOnInit(): void {
    this.getLanguagesList();
    this.setContent(this.content || INIT_CONTENT);
  }

  private createCodeEditor(element: Element, options: any): ace.Ace.Editor {
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.36.0/src-noconflict');
    const editor = ace.edit(element, options);
    editor.setTheme(THEME);
    editor.getSession().setMode(LANG);
    editor.setShowFoldWidgets(true);
    return editor;
}

  private getEditorOptions(): Partial<ace.Ace.EditorOptions> {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 10,
      maxLines: Infinity,
    };
    const extraEditorOptions: Partial<ace.Ace.EditorOptions> = {
      enableBasicAutocompletion: true,
    };
    const mergedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
    return mergedOptions;
  }

  // to be used to get the value of code being typd in the editor. use it to send this to the api
  public getContent() {
    console.log('inside getContent');
    
    if (this.codeEditor) {
        this.currentCode = this.codeEditor.getValue();
      }
    console.log('code', this.currentCode);
    // return this.currentCode;
  }

  /**
     * @param content - set as the editor's content.
     */
  public setContent(content: string): void {
    if (this.codeEditor) {
        this.codeEditor.setValue(content);
    }
  }

  public beautifyContent() {
    if (this.codeEditor && this.editorBeautify) {
      const session = this.codeEditor.getSession();
      console.log('session', session.getMode());
      
      this.editorBeautify.beautify(session);
    }
  }

  // /**
  //    * @event OnContentChange - a proxy event to Ace 'change' event - adding additional data.
  //    * @param callback - recive the corrent content and 'change' event's original parameter.
  //    */
  // public OnContentChange(callback: (content: string, delta: ace.Ace.Delta) => void): void {
  //   this.codeEditor.on('change', (delta) => {
  //       const content = this.codeEditor.getValue();
  //       callback(content, delta);
  //   });
  // }

  public setEditorTheme(theme: string): void {
    try {
      this.themeOptions.forEach((option, themeIndex) => {
        if (theme === option.theme) {
          this.codeEditor.setTheme(theme);
          this.themeOptions[themeIndex].isSelected = true;
        }
        else {
          this.themeOptions[themeIndex].isSelected = false;
        }
      })
    } catch (error) { console.log(error); }
}

  public getLanguagesList(): void {
    this.dataService.getSupportedLanguages().subscribe((langList) => {
      console.log('langList', langList);
      
      langList.forEach((lang) => {
        // this.languages.push(...lang.versionConfig);
        lang.versionConfig.forEach((config) => {
          this.languages.push(config);
          this.languageModes.push(lang.languageMode);

        })
      })
      console.log('language mode', this.languageModes);
      
      this.selectedLanguageDetails = this.languages[0];
      this.codeEditor.getSession().setMode(this.languageModes[0] as string);
    }, (err) => {
      console.log('err in getLanguagesList', err)
    })
  }

  getSelectedLanguage = (selectedLanguageIndex: string) : void => {
    console.log('selected language', selectedLanguageIndex);
    this.selectedLanguageDetails = this.languages[parseInt(selectedLanguageIndex)];
    this.codeEditor.getSession().setMode(this.languageModes[parseInt(selectedLanguageIndex)] as string);
    console.log(this.selectedLanguageDetails);
  }

  runTheCode = (): void => {
    const body = {
      program: this.currentCode || "console.log('Hard coded Api hit succeeded!')",
      language: this.selectedLanguageDetails.name,
      version: this.selectedLanguageDetails.index
    }
    console.log(
      'execute code body', body, typeof body
    );
    
    this.dataService.executeCode(body).subscribe((response) => {
      if(response.isExecutionSuccess) {
        this.codeOutput = response.output;
      }
      else {
        this.codeOutput = response.output;
      }
    }, (err) => {
      console.log('Error in runTheCode', err);
    })
  }
}
