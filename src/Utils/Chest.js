module.exports = class Chest extends Map {
    constructor(base, limit){
        super()

        this.base = base
        this.limit = limit ? limit : Infinity
    }

    filter(filter){
       const array = []

       for(let val of this.values()){
           if(filter(val)){
               array.push(val)
           }
       }

       return array
    }

    remove(id){
      let obj = this.get(id)
      if(!obj){
          return;
      }
      this.delete(obj.id)
      return obj
    }

    find(filter){
        for(let val of this.values()){
            if(filter(val)){
                return val
            }
        }
        return undefined
    }

    map(filter){
        let array = []

        for(let val of this.values()){
           array.push(filter(val))
        }
    
        return array
    }

    first(){
        return this.values().next().value
    }

    set(id, object){
        if(this.limit && this.limit > this.size){
          return super.set(id, object)
        }
    }
}