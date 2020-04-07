import HttpAxios from './http-axios';
import { IPublication } from '../models/publication';
import { AxiosResponse } from 'axios';
import { IAuthor } from '../models/author';

export class HttpClient {

  private http = HttpAxios;
  private URLPUBLICATIONS = 'http://www.mocky.io/v2/5be5e3fa2f000082000fc3f8';
  private URLAUTHORS = 'http://www.mocky.io/v2/5be5e3ae2f00005b000fc3f6';
  
  public getPublications(): Promise<AxiosResponse<IPublication[]>> {
    return this.http.get<Array<IPublication>>(this.URLPUBLICATIONS);
  }

  public getAuthors(): Promise<AxiosResponse<IAuthor[]>> {
    return this.http.get<Array<IAuthor>>(this.URLAUTHORS);
  }
}
