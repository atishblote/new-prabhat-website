import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Getting Started',
    children: [{name: 'Installing Dokan Multi-Vendor Marketplace'}, {name: 'Admin Multi-Step Setup Wizard'}, {name: 'Instaalled Pages'}],
  },
  {
    name: 'Dokan Withdraw System',
    children: [{name: 'first'},{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Refund Request',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Dokan Seller Announcement',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Earning Reports - Dokan',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-helps',
  standalone: true,
  imports:  [ RouterOutlet,RouterLink, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './helps.component.html',
  styleUrl: './helps.component.scss'
})
export class HelpsComponent implements OnInit {
  
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor( private meta: Meta) {
    
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description',
      content: "Help  the heart of Prabhat SattaMatka. Learn about our values and dedication to providing the best gaming experience",
    });
    this.meta.updateTag({
      property: 'og:title',
      content: "About Us -  Prabhat Satta Matka",
    });
    this.meta.updateTag({
      property: 'og:description',
      content: "Help  the heart of Prabhat SattaMatka. Learn about our values and dedication to providing the best gaming experience",
    });
    this.meta.updateTag({
      property: 'og:url',
      content: "https://prabhat-sattamatka.com/about-us",
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
