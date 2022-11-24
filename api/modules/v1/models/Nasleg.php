<?php
namespace app\modules\v1\models;


use yii\db\ActiveRecord;

/**
 * This is the model class for table "nasleg".
 *
 * @property int $id
 * @property int $district_id
 * @property string $name
 * @property string $alias
 * @property string $geometry
 *
 * @property District $district
 */
class Nasleg extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'nasleg';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'alias', 'geometry', 'district_id'], 'required'],
            [['district_id'], 'integer'],
            [['name', 'alias'], 'string', 'max' => 255],
            [['geometry'], 'string'],
            [['district_id'], 'exist', 'skipOnError' => true, 'targetClass' => District::className(), 'targetAttribute' => ['district_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'district_id' => 'District id',
            'name' => 'Name',
            'alias' => 'Alias',
            'geometry' => 'Geometry',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDistrict()
    {
        return $this->hasOne(District::className(), ['id' => 'district_id']);
    }
}