export class TileModel {
    static data = [
        {
            type: 'input',
            format: 'text',
            label:'Input Field'
        }, {
            type: 'dropdown',
            label: 'select an option',
            options: ['1', '2', '3']
        },
        {
            type: 'time'
        },
        {
            type: 'image',
            src: '../assets/photo-1575936123452-b67c3203c357.jpg'
        }
    ]
    static getData() {
        return this.data
    }
} 