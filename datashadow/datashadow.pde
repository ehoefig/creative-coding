/* 
 * Processing sketch.
 * Create a grid of blocks from a CSV file of statistical data.
 * Using this to export an OBJ file to blender.
 *
 * Created by Edzard Höfig
 * Licensed under CC BY 4.0
 */


import nervoussystem.obj.*;  // OBJ exporter library by Jesse Louis-Rosenberg

boolean record;

static String outname = "diagram.obj";

// gender, age group, none, college, bachelor, master, phd
static String inname = "education.csv";

// M/F, Age, Education level
static int AGES = 10;
static int CRITERIA = 6;
float[][][] data = new float[2][AGES][CRITERIA];


void setup() {
  size(800, 800, P3D);
  smooth();
  camera(0, 0, 10, 0, 0, 0, 0, 1, 0);
  perspective(PI/3.0, width/height, 1, 1000); 

  Table table = loadTable(inname, "header");

  //println(table.getRowCount() + " total rows in table");

  for (String s : table.getColumnTitles()) print(s + " ");
  println();

  int start = 0;
  for (int sex = 0; sex < 2; ++sex) {
    for (int i = 0; i < AGES; ++i) {
      TableRow row = table.getRow(i + start);
      for (int j = 0; j < CRITERIA; ++j) {
        data[sex][i][j] = row.getFloat(j+2) / 1000.0;
      }
    }
    start = AGES + 2;
  } 
  
  dump(0);  
}

void dump(int sex) {
  for (int i = 0; i < AGES; ++i) {
    for (int j = 0; j < CRITERIA; ++j) {
        print(data[sex][i][j] + " ");
    }
    println();
  }
}


void paint() {
  pushMatrix();
  for (int i = 0; i < AGES; ++i) {
    pushMatrix();
    for (int j = 0; j < CRITERIA; ++j) {
      float val = data[0][i][j];
      translate(2, 0, 0);
      pushMatrix();
      translate(0, val/2, 0);
      box(1, val, 1);
      popMatrix();
    }
    popMatrix();
    translate(0, 0, 2);
  }
  popMatrix();  
}


void draw() {

  background(0);
  fill(255);

  if (record) {
    beginRecord("nervoussystem.obj.OBJExport", outname);
  }

  paint();

  if (record) {
    endRecord();
    record = false;
  }
}

void keyPressed() {
  switch(key) {
  case 'r':
    record = true;
    break;
  default:
  }
}
