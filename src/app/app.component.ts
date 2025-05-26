import { Component, OnInit } from '@angular/core';
import { TileModel } from './tile.model';
interface DroppedItem {
  id: string;
  type: string;
  format: string;
  label: string;
  options: any[];
  x: number;
  y: number;
  time?: string;
  imageSrc?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentTime: string = '';
  fixedHour: string = '';
  fixedMin: string = '';
  droppedItems: DroppedItem[] = [];
  tileData: any[] = []

  ngOnInit(): void {
    this.tileData = TileModel.getData()
    this.updateTime()
    const saved = localStorage.getItem('data');
    this.droppedItems = saved ? JSON.parse(saved) : [];
  }

  onDragStart(event: DragEvent, type: string, format?: string, imageSrc?: string, time?: string, options?: any[], label?: string) {
    const dragData = JSON.stringify({ type, imageSrc, time, options, label, format });
    // console.log(dragData)
    event.dataTransfer?.setData('application/json', dragData);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(e: DragEvent) {
    e.preventDefault();

    const x = e.clientX
    const y = e.clientY

    const dataJson = e.dataTransfer?.getData('application/json');
    if (!dataJson) return;

    const data = JSON.parse(dataJson);
    if (data.mode === 'move' && data.id) {
      console.log(data)
      const item = this.droppedItems.find(item => item.id === data.id);
      if (item) {
        item.x = x
        item.y = y
        localStorage.setItem('data', JSON.stringify(this.droppedItems));
      }
      return;
    }
    const { type, imageSrc, time, options, label, format } = JSON.parse(dataJson);
    if (this.isDroppable(type)) {
      const newItem = {
        id: 'tile-' + Date.now(),
        type,
        options,
        format,
        label,
        x,
        y,
        imageSrc,
        time
      };

      this.droppedItems.push(newItem);

      localStorage.setItem('data', JSON.stringify(this.droppedItems));
    }
  }
  isDroppable(type: string): boolean {
    if (type === 'image' || type === 'time') {
      for (let i = 0; i < this.droppedItems.length; i++) {
        if (this.droppedItems[i].type === type) {
          return false;
        }
      }
    }
    return true;
  }
updateTime() {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();

  this.fixedHour = hours.toString().padStart(2, '0');
  this.fixedMin = minutes.toString().padStart(2, '0');

  setInterval(() => {
    seconds++;

    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }

    if (hours >= 24) {
      hours = 0;
    }

    this.currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

  onScreenDragStart(mode: string, event: DragEvent, id: string) {
    const dragData = JSON.stringify({ mode, id });
    event.dataTransfer?.setData('application/json', dragData);
  }

}
