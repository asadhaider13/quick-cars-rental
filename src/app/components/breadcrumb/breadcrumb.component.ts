import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET} from '@angular/router';
import 'rxjs/add/operator/filter';
import {IBreadcrumb} from '../../interfaces/IBreadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})

export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {

    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const children: ActivatedRoute[] = route.children;
    let label = '';

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {

      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      if (child.snapshot.url.map(segment => segment.path).length === 0) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      const routeArray = child.snapshot.url.map(segment => segment.path);

      for (let i = 0; i < routeArray.length; i++) {
        if (!this.isParam(child.snapshot.params, routeArray[i])) {
          label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
          const routeURL = routeArray[i];
          url += `/${routeURL}`;
          const breadcrumb: IBreadcrumb = {
            label: label,
            params: child.snapshot.params,
            url: url
          };
          breadcrumbs.push(breadcrumb);
        }
      }
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;

  }

  private isParam(params: Params, segment: string) {
    for (const key of Object.keys(params)) {
      const value = params[key];
      if (value === segment) {
        return true;
      }
    }
    return false;
  }
}
