<?php
Namespace app\modules\v1\models;
use http\Exception;
use Yii;
use yii\base\InvalidConfigException;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use yii\web\HttpException;

/**
 * This is the model class for table "questreq".
 *
 * @property int $id
 * @property int $user_id
 * @property int $quest_id
 * @property int $status
 * @property string $title
 *
 */
class Questreq extends ActiveRecord {

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'questreq';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'quest_id', 'status'], 'required'],
            [['user_id', 'quest_id', 'status'], 'integer'],
            [['title'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'quest_id' => 'Quest ID',
            'status' => 'Status',
            'title' => 'Title',
        ];
    }
}