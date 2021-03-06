import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {init, initTabs, initReturnToTop, initDetailListSlider} from '../../../assets/js/sliders';
import {ListingService} from '../../services/listing.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Constants} from '../../constants';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  public listing: IListing.Detail;
  public listingId;
  public BASE_URL = Constants.BASE_URL;
  public total: number;
  private sub: Subscription;

  constructor(private _listingService: ListingService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.listingId = params['id'];
      this.getListing(this.listingId);
    });
  }

  updateTotal(extras) {
    if (extras.isChecked) {
      this.total += extras.rate;
    } else {
      this.total -= extras.rate;
    }
  }

  getListing(id: number) {
    this._listingService.getListingById(id)
      .subscribe(
        data => {
          this.listing = data.Result;
          this.total = this.listing.rate;
        },
        err => console.error(err),
      );
  }

  array_chunks(arr) {
    if (!arr || !arr.length) {
      return [];
    }
    const chunkSize = Math.ceil(arr.length) / 3;
    const groups = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  }

  ngAfterViewInit(): void {
    init();
    initTabs();
    initReturnToTop();
    initDetailListSlider();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
