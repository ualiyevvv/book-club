// в чем разница между export и exports ??
module.exports = class LevelDto {
    id;
    name;
    description;
    min_points;
    level_score;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.description = model.description;
        this.min_points = model.min_points;
        this.level_score = model.level_score;
    }
}