import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
})
export class ContentComponent implements OnInit {
  dataURL = "https://api.spacexdata.com/v3/launches?limit=100";
  launch_years = [
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ];
  success_launch = ["True", "False"];
  success_landing = ["True", "False"];

  active_year = "";
  active_launch = "";
  active_landing = "";

  missionData = [];
  opacity = 1;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // checking the query params
    this.route.queryParams.subscribe((params) => {
      this.opacity = 0.2;
      this.getData(params);

      if (params.hasOwnProperty("launch_year")) {
        (<any>this.active_year) = +params.launch_year;
      }
      if (params.hasOwnProperty("launch_success")) {
        this.active_launch = params.launch_success == "true" ? "True" : "False";
      }
      if (params.hasOwnProperty("land_success")) {
        this.active_landing = params.land_success == "true" ? "True" : "False";
      }
    });

    // this.getRequest(this.dataURL).subscribe((data) => {
    //   this.formatData(data);
    // });
  }

  getRequest<T>(url: string, params?: object) {
    return this.http.get<T>(url, params);
  }

  // function to get the data from the API
  getData(params) {
    // https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014
    let url = this.dataURL;
    // this.spinner.show();

    Object.entries(params).forEach(([key, value]) => {
      url += "&" + key + "=" + value;
    });
    this.getRequest(url).subscribe(
      (data) => {
        this.formatData(data);
      },
      (error) => {
        this.opacity = 1;
      }
    );
  }

  // on click setting the properties for the route
  setRoute() {
    let queryParams = {};
    if (this.active_year !== "") {
      queryParams["launch_year"] = this.active_year;
    }
    if (this.active_launch == "True") {
      queryParams["launch_success"] = true;
    }
    if (this.active_launch == "False") {
      queryParams["launch_success"] = false;
    }
    if (this.active_landing == "True") {
      queryParams["land_success"] = true;
    }
    if (this.active_landing == "False") {
      queryParams["land_success"] = false;
    }
    this.router.navigate([], { queryParams: queryParams });
  }

  // formatting the recieved data to store only the info needed
  formatData(data) {
    this.missionData = [];
    data.forEach((value) => {
      this.missionData.push({
        image: value.links.mission_patch,
        mission_name: value.mission_name,
        flight_number: value.flight_number,
        mission_id: value.mission_id,
        launch_year: value.launch_year,
        launch_success:
          value['launch_success'],
        land_success:
           value['land_success'],
      });
    });

    this.opacity = 1;
  }
}
